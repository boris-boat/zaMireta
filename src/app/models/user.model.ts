export class User {

    _id: string;

    user: string;

    termini: Termin[];

    constructor(obj?: any) {

        this._id = (obj && obj._id) || "";

        this.user = (obj && obj.user) || "";

        this.termini = (obj && obj.termini) || [];

    }
}

class Termin {

    datum: Date;

    vreme: string;

    constructor(obj?: any) {

        this.datum = (obj && obj.datum) || "";

        this.vreme = (obj && obj.vreme) || "";

    }
}