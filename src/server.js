/// modulo interno do node 
/// este modulo possue varias propriedades para construirmos aplicação com http 
/// com http conseguimos criar rotas get | put | update | delete | post
/// tambem utilizamos este padrão de importação ESModule onde as importações e exportações utilizam import e export
// const http = require('http')

import http from 'http'

const server = http.createServer((req, response) => {

})


server.listen(3333)
/// nosso servidor http vai escutar nesta porta localhost:3333