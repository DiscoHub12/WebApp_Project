
export class Treatments {
    id: Number;
    nome: String;
    cognome: String;
    nomeTrattamento: String;
    descrizione: String;
    data: Date;


    constructor(
        id: Number,
        nome: String,
        cognome: String,
        nomeTrattamento: String,
        descrizione: String,
        data: Date,
    ) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.nomeTrattamento = nomeTrattamento;
        this.descrizione = descrizione;
        this.data = data;
    }

    getId(): Number {
        return this.id;
    }


    getNomeTrattamento(): String {
        return this.nomeTrattamento;
    }

    getDescrizione(): String {
        return this.descrizione;
    }

    getData(): Date {
        return this.data;
    }


}