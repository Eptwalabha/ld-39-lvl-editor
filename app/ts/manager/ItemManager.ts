interface Item extends Entity {
    power?: number
    unique: boolean
}

class ItemManager extends Manager {

    items: Array<Item>;

    constructor () {
        super();
        this.load();
    }

    create(name: string): any {
        return undefined;
    }

    copy(id: number, name: string): any {
        return undefined;
    }

    remove(id: number) {
    }

    save() {
    }

    get(id: number) {
    }

    private load() {
        this.items = [];
        this.items.push({
            id: 0,
            name: "start",
            unique: true
        });
        this.items.push({
            id: 1,
            name: "end",
            unique: true
        });
        this.items.push({
            id: 2,
            name: "small",
            power: 25,
            unique: false
        });
        this.items.push({
            id: 3,
            name: "medium",
            power: 50,
            unique: false
        });
        this.items.push({
            id: 4,
            name: "large",
            power: 100,
            unique: false
        });
    }
}