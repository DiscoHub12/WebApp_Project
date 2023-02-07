export class Treatments {
    id: Number;
    idUtente: Number;
    nome: String;
    descrizione: String;
    data: Date;


    constructor(
        id: Number,
        idUtente: Number,
        nome: String,
        descrizione: String,
        data: Date
    ) {
        this.id = id;
        this.idUtente = idUtente;
        this.nome = nome;
        this.descrizione = descrizione;
        this.data = data;
    }

    getId(): Number {
        return this.id;
    }

    getIdUtente(): Number {
        return this.idUtente;
    }


    getNome(): String {
        return this.nome;
    }

    getDescrizione(): String {
        return this.descrizione;
    }

    getData(): Date {
        return this.data;
    }


}