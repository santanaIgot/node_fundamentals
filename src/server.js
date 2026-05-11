/// modulo interno do node 
/// este modulo possue varias propriedades para construirmos aplicação com http 
/// com http conseguimos criar rotas get | put | update | delete | post
/// tambem utilizamos este padrão de importação ESModule onde as importações e exportações utilizam import e export
//  const http = require('http')



/// ---------------- três formas do front-end enviar requisições ---------------------
//  Query parameters : são parametros que enviamos no proprio end da req http://localhost:3333/users?id=1 - é utilizado em aplicações stateful - serve para enviar informações que não são sensíveis | 
// é utilizado para filtros, paginação, pra coisas que modificam as respostas mas não é uma obrigatoriedade 

//  Route parameters : são parametros não nomeados que ficam na rota da aplicação, segue o exemplo abaixo
// http://localhost:3333/users/1 - serve para identificação de recurso http  

//  Request body : UTILIZADO PARA ENVIO DE INFORMAÇÕES DE UM FORMULÁRIO




// aplicação statefull(sempre terá informações sendo armazenada em memória) e aplicação staless(salva informações em dispositivos externos como banco de dados ) 

import http from 'http'
import { json } from './middlewares/json.js';
import { route } from './routes.js';

// dentro do req consigo obter todas as informações que estão chegando da requisição
// req e res também são streams
// memória onde serão armazenado os dados 
// const users = [];

// const database = new Database();

///req e res são streams também
// quando faço uma requisição http pro servidor eu posso manter essa requisição aberta e enviar dados pra ela aos poucos 
// e quando vou devolver uma resposta pro servidor, eu posso devolver aos poucos 
const server = http.createServer(async (req, res) => {
    const {method, url} = req;

    // console.log(method, url);

    // console.log(req);

    // const buffers = []

    // aguarda cada pedaço da stream a ser retornado 
    // essa sintaxe permite percorrermos toda a stream e enquanto não percorrer ela toda não é exibido nada
    // com esta sintaxe nos conseguimos ler todos os dados de uma stream antes de processar ela
    // for await(const chunk of req){
    //     buffers.push(chunk)
    // }
    
    
    // const body = Buffer.concat(buffers).toString() - ***vindo como texto**** 

    // try {
    //     req.body = JSON.parse(Buffer.concat(buffers).toString())    
    // } catch {
    //     req.body = null 
    // }
    

    await json(req, res)

    //se a gente tentar pegar alguma propriedade desse texto por exemplo: body.name
    // vai dar erro pois nosso body esta vindo como texto entao temos que dar um JSON.parse nele  
    // com o json.parse transformamos esse texto em um JSON 
    // console.log(body);
    
    
    
    // if(method == 'GET' && url == '/users'){
        // const users = database.select('users')
        // return res
        // .setHeader('Content-Type', 'application/json').end(JSON.stringify(users))
    // }

    // if(method == 'POST' && url == '/users'){
        // const {nome, email} = req.body;
        // // users.push({id: 1,nome, email})

        // const user = {
        //     id: randomUUID(),
        //     nome, 
        //     email
        // }

        // database.insert('users', user)
        // return res.end('Usuário cadastrado')
    // }


    const routes = route.find(route => {
        // esse método test() é um método do regex que verifica se a url contém caracteres validos comparados ao do regex
        return route.method == method && route.path.test(url)
    })

    if(routes){
        const routeParams = req.url.match(route.path)
        console.log("🚀 ~ routeParams:", routeParams.groups)

        return routes.handler(req, res)
    }

    // console.log(routes);
    


    return res.end('Hello ig')
})


server.listen(3333)
/// nosso servidor http vai escutar nesta porta localhost:3333


// process.stdin : é tudo o que o usuário digita no terminal 


// buffer é uma representação de uma memoria no espaço do computador. 