export class Card{
    id : Number;
    idUtente : Number; 
    codice : String; 
    punti : Number; 


    constructor(id: Number, idUtente : Number, codice : String, punti : Number){
        this.id = id;
        this.idUtente = idUtente;
        this.codice = codice;
        this.punti = punti;
    }

    getPunti() {
        return this.punti;
    }

}