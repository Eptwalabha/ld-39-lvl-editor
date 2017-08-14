abstract class Manager {

    constructor () {
    }

    abstract new (name: string): any;
    abstract copy (id: number, name: string): any;
    abstract delete (id: number);
    abstract save ();
    abstract get (id: number);
}