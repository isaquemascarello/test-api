export default ( WebSocket, ws, { object, optKeys, optValues, origin, protocol, url }) => new Promise(

response => {

    const
        client = new WebSocket(`${ protocol }://${ url }${ optKeys.toString() }`, { origin }),
        ping = setInterval(() => { client.send('') }, 6e4 )

    client.onmessage = ({ data }) => {

        const
            d = data.split(','),
            name = d[0].split('=')[0]

        if( optKeys.includes( name )) {

            const
                asset = object[ name ],
                [ currency, value ] = ( check => check
                    ? [{}, Number(d[8])]
                    : [
                        { currency: Number(d[8])},
                        Number((ws.v[optValues[0]]?.value / d[8]).toFixed(2))
                    ]
                )(name == optKeys[0])

            if( ws.v[ asset ]?.value == value ) return

            const date = new Date().getTime()
            
            ws.v[ asset ] = { value, date, ...currency }

            if( name == optKeys[0] )

                optKeys.slice(1).forEach( o => { if(ws.v[ object[ o ]]){

                    ws.v[ object[ o ]].value = Number((value / ws.v[ object[ o ]]?.currency).toFixed(2))
                    ws.v[ object[ o ]].date = date
                }})

            ws.v.send = JSON.stringify(
                optValues
                    .slice(asset != optValues[0] ? 1 : 0)
                    .reduce((o,e) => {
                        o[e] = ws.v[e]?.value
                        return o
                    },{}))
console.log('[SEND]     ', ws.v.send)
            ws.s.clients.forEach(client => client.send(ws.v.send))
        }
    }

    client.onclose = () => {
        clearInterval( ping )
    }

    client.onopen = ({ target }) => {
        ws.v = {}
console.log('[CONNECTED]')
        response( target )
    }
})