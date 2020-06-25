class ControleRemoto {
    constructor(tv) {
        this.tv = tv;
        this.volume = 0;
    }

    //Método de instância
    aumentaVol() {
        this.volume += 2;
    }

    diminuiVol(){
        this.volume -= 2;
    }

    // Método de estático
    static trocaPilha() {
        console.log('trocar a pilha');
    }
}

const controle1 = new ControleRemoto('LG');
controle1.aumentaVol();
controle1.aumentaVol();
console.log(controle1);
ControleRemoto.trocaPilha();