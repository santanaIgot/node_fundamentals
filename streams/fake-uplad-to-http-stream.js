import {Readable} from 'node:stream'
// Esse fakeUploadToHttpStream simula um front-end enviando arquivo aos poucos com stream com fetchApi
// essa classe contem um método obrigatorio que é o método read.

// fetch api é uma biblioteca do javascript que usamos para trabalhar com requisiçoes e respostas em protocolo http 
class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    //cada vez que o método read for executado irá somar mais 1
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null); // quando for 100 ele setará null caso contrario irá processar os dados 
      } else {
        const buf = Buffer.from(String(i)); // converte o i em buffer 
        this.push(buf);
      }
    }, 1000);
  }
}


await fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    // Node.js fetch exige duplex ao enviar um stream como body
    duplex: 'half',
})
