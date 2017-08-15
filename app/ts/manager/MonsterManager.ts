interface Monster extends Entity {
    realTime: Array<any>,
    timeBased: Array<any>
}

class MonsterManager extends Manager {

    private monsters: Array<Monster>;

    constructor() {
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
        var monsterA: Monster = {
            id: 0,
            name: "tb-pinky",
            realTime: [],
            timeBased: []
        };
        var monsterB: Monster = {
            id: 1,
            name: "rt-pinky",
            realTime: [],
            timeBased: []
        };
        var monsterC: Monster = {
            id: 2,
            name: "tb-darky",
            realTime: [],
            timeBased: []
        };
        var monsterD: Monster = {
            id: 3,
            name: "rt-darky",
            realTime: [],
            timeBased: []
        };
        this.monsters = [];
        this.monsters.push(monsterA);
        this.monsters.push(monsterB);
        this.monsters.push(monsterC);
        this.monsters.push(monsterD);
    }
}