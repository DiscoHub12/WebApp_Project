export class Animal {
    id: String;
    nomeAnimale: String;
    colore: String;
    descrizione: String;

    //costruttore Classe
    constructor(id:string, nomeAnimale:string, colore:string, descrizione:string){
        this.id = id; 
        this.nomeAnimale = nomeAnimale; 
        this.colore = colore; 
        this.descrizione = descrizione; 
    }

    //metodi Get e Set per eventuali modifiche;
    getId(){
        return this.id; 
    }

    getNomeaAnimale(){
        return this.nomeAnimale; 
    }

    setNomeAnimale(nomeAnimale: String){
        this.nomeAnimale = nomeAnimale; 
    }

    getColore(){
        return this.colore; 
    }

    setColore(colore: String){
        this.colore = colore; 
    }

    getDescrizione(){
        return this.descrizione; 
    }

    setDescrizione(descrizione: String){
        this.descrizione = descrizione; 
    }
}