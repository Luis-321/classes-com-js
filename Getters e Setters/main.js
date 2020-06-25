const _velocidade = Symbol('velocidade');
class Carro {
    constructor(nome) {
        this.nome = nome;
        this[_velocidade] = 0;
    }
    set velocidade(valor) {
        if(typeof valor !== 'number'){
            console.log('Digite um numero para a velocidade');    
            return;
        }
        if(valor >= 100 || valor <= 0) {
            console.log(`Velocidade acima do que permitida ${c1.velocidade} / permitida: ${c1.velocidade}Km/h`);
            return;
        }
        this[_velocidade] = valor;
    }

    get velocidade() {
        return this[_velocidade];
    }

    acelerar() {
        if(this[_velocidade] >= 100) return;
        this[_velocidade]++;
    }

    feiar() {
        if(this[_velocidade] <= 0) return;
        this[_velocidade]--;
    }
}

const c1 = new Carro('Fusca');

for(let i = 0; i <= 200; i++) {
    c1.acelerar();
}
c1.velocidade = 2000;
console.log(c1.velocidade);