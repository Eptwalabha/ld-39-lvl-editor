interface Entity {
    id: number,
    name: string
}

abstract class Manager {

    constructor () {
    }

    abstract create (name: string): any;
    abstract copy (id: number, name: string): any;
    abstract remove (id: number);
    abstract save ();
    abstract get (id: number);
}