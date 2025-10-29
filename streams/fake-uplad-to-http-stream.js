import {Readable} from 'node:stream'

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


fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
})