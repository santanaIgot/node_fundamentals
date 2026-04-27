/// modulo interno do node 
/// este modulo possue varias propriedades para construirmos aplicação com http 
/// com http conseguimos criar rotas get | put | update | delete | post
/// tambem utilizamos este padrão de importação ESModule onde as importações e exportações utilizam import e export
// const http = require('http')


// aplicação statefull(sempre terá informações sendo armazenada em memória) e aplicação staless(salva informações em dispositivos externos como banco de dados ) 

import http from 'http'
import { json } from './middlewares/json.js';
import { Database } from './database.js';
// dentro do req consigo obter todas as informações que estão chegando da requisição
// req e res também são streams
// memória onde serão armazenado os dados 
// const users = [];

const database = new Database();

///req e res são streams também
// quando faço uma requisição http pro servidor eu posso manter essa requisição aberta e enviar dados pra ela aos poucos 
// e quando vou devolver uma resposta pro servidor, eu posso devolver aos poucos 
const server = http.createServer(async (requisicao, response) => {
    const {method, url} = requisicao;

    console.log(method, url);

    console.log(requisicao);

    // const buffers = []

    // aguarda cada pedaço da stream a ser retornado 
    // essa sintaxe permite percorrermos toda a stream e enquanto não percorrer ela toda não é exibido nada
    // com esta sintaxe nos conseguimos ler todos os dados de uma stream antes de processar ela
    // for await(const chunk of requisicao){
    //     buffers.push(chunk)
    // }
    
    
    // const body = Buffer.concat(buffers).toString() - ***vindo como texto**** 

    // try {
    //     requisicao.body = JSON.parse(Buffer.concat(buffers).toString())    
    // } catch {
    //     requisicao.body = null 
    // }
    

    await json(requisicao, response)

    //se a gente tentar pegar alguma propriedade desse texto por exemplo: body.name
    // vai dar erro pois nosso body esta vindo como texto entao temos que dar um JSON.parse nele  
    // com o json.parse transformamos esse texto em um JSON 
    // console.log(body);
    
    
    
    if(method == 'GET' && url == '/users'){
        const users = database.select('users')
        return response
        .setHeader('Content-Type', 'application/json').end(JSON.stringify(users))
    }

    if(method == 'POST' && url == '/users'){
        const {nome, email} = requisicao.body;
        // users.push({id: 1,nome, email})

        const user = {
            id: 1,
            nome, 
            email
        }

        database.insert('users', user)
        return response.end('Usuário cadastrado')
    }


    return response.end('Hello ig')
})


server.listen(3333)
/// nosso servidor http vai escutar nesta porta localhost:3333


// process.stdin : é tudo o que o usuário digita no terminal 


// buffer é uma representação de uma memoria no espaço do computador. 