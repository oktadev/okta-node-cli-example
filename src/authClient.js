"use strict";

const axios = require( "axios" );
const hapi = require( "@hapi/hapi" );
const crypto = require( "crypto" );
const open = require( "open" );
const querystring = require( "querystring" );
const uuid = require( "uuid/v1" );

const base64url = str => {
  return str.replace( /\+/g, "-" ).replace( /\//g, "_" ).replace( /=+$/, "" );
};
  
module.exports = ( { oktaOrgUrl, clientId, scopes, serverPort } ) => {
  if ( !oktaOrgUrl || !clientId || !scopes || !serverPort ) {
    throw new Error( "Okta organization URL, client ID, scopes, and server port are required." );
  }
  // code verifier must be a random string with a minimum of 43 characters
  const codeVerifier = uuid() + uuid();
  const redirectUri = `http://localhost:${serverPort}/callback`;

  const buildAuthorizeUrl = ( codeChallenge ) => {
    const data = {
      client_id: clientId,
      response_type: "code",
      scope: scopes,
      redirect_uri: redirectUri,
      state: uuid(),
      code_challenge_method: "S256",
      code_challenge: codeChallenge
    };
    const params = querystring.stringify( data );
    const authorizeUrl = `${oktaOrgUrl}/oauth2/v1/authorize?${params}`;
    return authorizeUrl;
  };

  const getUserInfo = async accessToken => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
      };
      const url = `${oktaOrgUrl}/oauth2/v1/userinfo`;
      const res = await axios.get( url, config );
      return res.data;
    } catch ( err ) {
      console.log( "error getting user info", err ); // eslint-disable-line no-console
      throw err;
    }
  };

  const getToken = async code => {
    try {
      const request = {
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        client_id: clientId,
        code,
        code_verifier: codeVerifier
      };
      const url = `${oktaOrgUrl}/oauth2/v1/token`;
      const data = querystring.stringify( request );
      const res = await axios.post( url, data );
      return res.data;
    } catch ( err ) {
      console.log( "error getting token", err ); // eslint-disable-line no-console
      throw err;
    }
  };
  
  // Start server and begin auth flow
  const executeAuthFlow = () => {
    return new Promise( async ( resolve, reject ) => {
      const server = hapi.server( {
        port: serverPort,
        host: "localhost"
      } );
    
      server.route( {
        method: "GET",
        path: "/callback",
        handler: async request => {
          try {
            const code = request.query.code;
            const token = await getToken( code );
            const userInfo = await getUserInfo( token.access_token );
            resolve( { token, userInfo } );
            return `Thank you, ${userInfo.given_name}. You can close this tab.`;
          } catch ( err ) {
            reject( err );
          } finally {
            server.stop();
          }
        }
      } );
      await server.start();

      const codeChallenge = base64url( crypto.createHash( "sha256" ).update( codeVerifier ).digest( "base64" ) );
      const authorizeUrl = buildAuthorizeUrl( codeChallenge );
      open( authorizeUrl );  
    } );
  };
  
  return {
    executeAuthFlow
  };
};
