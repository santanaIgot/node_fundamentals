// quando pensamos em streams a primeira coisa que vem a nossa mente é streaming
// netflix & spotify
// conseguimos ver um filme ou continuar escutando uma musica mesmo que o filme ou a musica ainda não esteja carregado por completo
// conseguimos obter uma pequena parte de uma coisa mesmo que o arquivo ainda n esteja carregado por completo

// importamos um arquivo csv com 1gb que é basicamente -- 1.000.000 de linhas
// Para carregar esse arquivo temos um endpoint POST /upload import.csv

// para carregar esse arquivo exibir todas essas linhas levaria muito tempo. Então aplicamos o conceito de stream para ir renderizando/mostrando algumas linhas que foram baixadas

//process variavel global do node.
//stdin capta tudo o que é digitado no terminal

// process.stdin
//     .pipe(process.stdout)

//tudo que recebe como entrada stdin(). COm o pipe enchaminhamos pipe(process.stdout) que é uma saída. No caso o terminal
// no node toda porta de entrada e saída é uma stream()
// por exemplo req e res são uma stream no final das contas
// quando fazemos uma req http no node, podemos manter essa req aberta e enviar dados aos poucos

import { Readable, Writable, Transform } from "node:stream";

// essa classe contem um método obrigatorio que é o método read.
class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    //cada vez que o método read for executado irá somar mais 1
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(i.toString());
        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1 
        callback(null, Buffer.from(transformed.toString()))
    }
}
class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString() * 10 ))
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream)
    .pipe(new MultiplyByTenStream);


