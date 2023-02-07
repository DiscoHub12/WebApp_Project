export class Booking {
    id: Number;
    idUtente: Number;
    dataPrenotazione: Date;
    completata: boolean;


    constructor(
        id: Number,
        idUtente: Number,
        dataPrenotazione: Date,
    ) {
        this.id = id;
        this.idUtente = idUtente;
        this.dataPrenotazione = dataPrenotazione;
        this.completata = false;
    }

    setCompletata(completata: boolean): void {
        this.completata = completata;
    }

    getCompletata(): boolean {
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

}