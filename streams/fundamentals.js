// Importando um modulo interno no node
import { Readable ,Writable, Transform } from 'node:stream'


/* Criando um fluxo de leitura personalizado */ 
class OneToHundredStream extends Readable {
    index = 1

    /* Método especial para criarmos o um fluxo de leitura */
    _read() {

        const i = this.index++

        // Introduzir um atraso de 1000 milissegundos entre cada número
        setTimeout(() => {
            if(i > 100){
                this.push(null)
            }else {
                // O buffer tem que ser string
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberString extends Transform {
    _transform(chunk, encoding, callback) {
        const transform = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transform)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10);
    }
}


new OneToHundredStream()
    .pipe(new InverseNumberString())
    .pipe(new MultiplyByTenStream())