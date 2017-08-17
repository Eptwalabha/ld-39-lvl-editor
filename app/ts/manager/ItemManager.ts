interface Item extends Entity {
    power: number
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
            name: "small",
            power: 25
        });
        this.items.push({
            id: 1,
            name: "medium",
            power: 50
        });
        this.items.push({
            id: 2,
            name: "large",
            power: 100
        });
    }
}