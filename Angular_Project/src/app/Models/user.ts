export class User {
    id : Number;
    nome : String;
    cognome : String;

    constructor(id : Number, nome : String, cognome : String) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
    }

    getId() {
        return this.id;
    }

    getNome() {
        return this.nome;
    }

    getCognome() {
        return this.cognome;
    }
    
}