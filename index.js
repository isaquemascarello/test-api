// import { WebSocket, WebSocketServer } from 'ws'
// import { createHash } from 'node:crypto'
// import clientConnect from './src/client/connect.js'
// import serverConnect from './src/server/connect.js'

const {
        C_ASSETS,
        C_ORIGIN: origin,
        C_PROTOCOL: protocol,
        C_URL: url,
        PORT,
        S_KEY: key,
        S_PORT,
        S_ORIGIN: checkOrigin
    } = process.env,
    port = PORT || S_PORT,
    object = JSON.parse( C_ASSETS ),
    optKeys = Object.keys( object ),
    optValues = Object.values( object ),
    client = { object, optKeys, optValues, origin, protocol, url },
    server = { checkOrigin, key, port }//,
//     ws = {}
console.log(client, '\n\n', server)
// ws.c = await clientConnect( WebSocket, ws, client )
// ws.s = serverConnect( WebSocketServer, ws, createHash, server )