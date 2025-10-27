/// modulo interno do node 
/// este modulo possue varias propriedades para construirmos aplicação com http 
/// com http conseguimos criar rotas get | put | update | delete | post
/// tambem utilizamos este padrão de importação ESModule onde as importações e exportações utilizam import e export
// const http = require('http')


// aplicação statefull(sempre terá informações sendo armazenada em memória) e aplicação staless(salva informações em dispositivos externos como banco de dados ) 

import http from 'http'
// dentro do req consigo obter todas as informações que estão chegando da requisição

// memória onde serão armazenado os dados 
const users = [];

const server = http.createServer((requisicao, response) => {
    const {method, url} = requisicao;

    console.log(method, url);
    
    if(method == 'GET' && url == '/users'){
        return response.setHeader('Content-Type', 'application/json').end(JSON.stringify(users))
    }

    if(method == 'POST' && url == '/users'){
        users.push({
            id:1,
            nome:"Igor",
            idade: 22
        })
        
        return response.end('Cadastro de usuário')
    }


    return response.end('Hello ig')
})


server.listen(3333)
/// nosso servidor http vai escutar nesta porta localhost:3333