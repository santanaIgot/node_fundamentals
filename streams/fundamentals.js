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

import {Readable} from 'node:stream'

class OneToHundredStream extends Readable {
    
}