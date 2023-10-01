import { Readable } from 'node:stream'



/* Criando um fluxo de leitura personalizado */ 
class OneToHundredStream extends Readable {
    index = 1

    /* Método especial para criarmos o um fluxo de leitura */
    _read() {

        const i = this.index++

        // Introduzir um atraso de 1000 milissegundos entre cada número
        setTimeout(() => {
            if(i > 5){
                this.push(null)
            }else {
                // O buffer tem que ser string
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half',
}).then(response => {
    response.text().then(data => {
        console.log(data)
    })
})