import http from "node:http"
import {Transform} from "node:stream"

    class InverseNumberStream extends Transform{
        _transform(chunk, encoding, callback){
            const transformed = Number(chunk.toString()) * -1 
            callback(null, Buffer.from(transformed.toString()))
            console.log(transformed);
            
        }
    }

    //req => ReadableStream
    //res => WritableStream
const server = http.createServer(async (req, res) => {
    const buffers = []

    // aguarda cada pedaço da stream a ser retornado 
    // essa sintaxe permite percorrermos toda a stream e enquanto não percorrer ela toda não é exibido nada
    // com esta sintaxe nos conseguimos ler todos os dados de uma stream antes de processar ela
    for await(const chunk of req){
        buffers.push(chunk);
    }
    // concat vai unir todos os chunks 
    const fullBodyStream = Buffer.concat(buffers).toString()

    console.log(fullBodyStream);
    
    return res.end(fullBodyStream)
    // return req
    // .pipe(new InverseNumberStream())
    // .pipe(res);
})

server.listen(3334)