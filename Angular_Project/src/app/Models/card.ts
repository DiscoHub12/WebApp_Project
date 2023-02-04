export class Card{

    points : Number;


    constructor(points : Number){
        this.points = points;
    }

    getPoints() {
        return this.points;
    }

    setPoints(points : Number) {
        this.points = points;
    }

}