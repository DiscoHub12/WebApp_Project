import { Time } from "@angular/common";

export class Booking {
    id: Number;
    idUtente: Number;
    dataPrenotazione: Date;
    oraPrenotazione: Time;
    trattamento: String;
    completata: Number;
    owner : {
        nome : String,
        cognome : String
    }


    constructor(
        id: Number,
        idUtente: Number,
        dataPrenotazione: Date,
        oraPrenotazione : Time,
        trattamento : String,
        completata : Number,
        owner : any
    ) {
        this.id = id;
        this.idUtente = idUtente;
        this.dataPrenotazione = dataPrenotazione;
        this.oraPrenotazione = oraPrenotazione;
        this.completata = completata;
        this.trattamento = trattamento;
        this.owner = owner;
    }

    setCompletata(completata: Number): void {
        this.completata = completata;
    }

    getCompletata(): Number {
        return this.completata;
    }

    getId(): Number {
        return this.id;
    }

    getIdUtente(): Number {
        return this.idUtente;
    }

    getDataPrenotazione(): Date {
        return this.dataPrenotazione;
    }

    setDataPrenotazione(dataPrenotazione: Date): void {
        this.dataPrenotazione = dataPrenotazione;
    }

    getTrattamento(){
        return this.trattamento;
    }

}