/// modulo interno do node 
/// este modulo possue varias propriedades para construirmos aplicação com http 
/// com http conseguimos criar rotas get | put | update | delete | post
/// tambem utilizamos este padrão de importação ESModule onde as importações e exportações utilizam import e export
// const http = require('http')

import http from 'http'
// dentro do req consigo obter todas as informações que estão chegando da requisição
const server = http.createServer((requisicao, response) => {
    return response.end('Hello world')
})


server.listen(3333)
/// nosso servidor http vai escutar nesta porta localhost:3333