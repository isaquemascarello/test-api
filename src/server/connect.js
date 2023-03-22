export default ( WebSocketServer, ws, createHash, { checkOrigin, key, port }) => {
console.log('[PORT]     ', port)
    const
        server = new WebSocketServer({ port }),
        credential = createHash( 'sha1' ).update( key ).digest( 'hex' )

    server.on('connection', client => {

        if( client._socket.closed ) return
console.log('[CLIENT]   ', server.clients.size)
        client.on('message', ({ byteLength }) => {

            if( !byteLength ){

                client.lastPing = new Date().getTime()
                return
            }
            return client.close( 1008 )
        })
        client.send(ws.v.send)
    })

    server.on('headers', ( headersResponse, { client, headers: {
                origin, 'sec-websocket-protocol': protocol
    }}) => {
console.log('[CONNECT]  ', origin, protocol)
        if( protocol != credential || origin != checkOrigin ){
console.log('[CONNECT]  ', '401 Unauthorized')
            client.write('HTTP/1.1 401 Unauthorized')
            client.destroy()
        }
    })

    return server
}