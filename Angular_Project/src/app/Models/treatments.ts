export class Treatments {
    id: Number;
    idUtente: Number;
    nome: String;
    descrizione: String;
    data: Date;
    owner : {
        nome: String, 
        cognome:String,
    }


    constructor(
        id: Number,
        idUtente: Number,
        nome: String,
        descrizione: String,
        data: Date,
        owner : any
    ) {
        this.id = id;
        this.idUtente = idUtente;
        this.nome = nome;
        this.descrizione = descrizione;
        this.data = data;
        this.owner = owner; 
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