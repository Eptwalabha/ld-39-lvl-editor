interface Level {
    id: number,
    name: string,
    layoutId: number,
    monsters: Array<any>,
    items: Array<any>
}

class LevelManager extends Manager {

    private levels: Array<Level>;
    private current: number;

    constructor () {
        super();
        this.loadFromLocalStorage();
        this.current = this.levels[0].id;
    }

    create(name: string): Level {
        var newLevel = {
            id: this.getUnusedId(),
            name: 'toto',
            layoutId: 0,
            monsters: [],
            items: []
        };
        this.levels.push(newLevel);
        return newLevel;
    }

    copy(id: number, name: string) {
    }

    remove(id: number) {
    }

    private getIndexOf (id: number) {
        for (var i = 0; i < this.levels.length; ++i) {
            if (this.levels[i].id === id) {
                return i;
            }
        }
        return null;
    }

    save () {
        var levels: Array<Level> = [];
        for (var l = 0; l < this.levels.length; ++l) {
            var layout = this.copyLevel(this.levels[l]);
            levels.push(layout);
        }
        var json = JSON.stringify(levels);
        localStorage.setItem("levels", json);
    }

    get (id: number) {
        for (var i = 0; i < this.levels.length; ++i) {
            if (this.levels[i].id === id) return this.levels[i];
        }
        return null;
    }

    setCurrent (id: number): Level {
        if (this.idExists(id)) this.current = id;
        return this.getCurrent();
    }

    getCurrent () {
        return this.get(this.current);
    }

    private idExists (id: number): boolean {
        for (var i = 0; i < this.levels.length; ++i) {
            if (this.levels[i].id === id) return true;
        }
        return false;
    }

    private getUnusedId (): number {
        var id: number = Date.now(),
            alreadyUsed: boolean;
        do {
            id++;
            alreadyUsed = false;
            for (var i = 0; i < this.levels.length; ++i) {
                if (this.levels[i].id === id) {
                    alreadyUsed = true;
                    break;
                }
            }
        } while (alreadyUsed);
        return id;
    }

    private loadFromLocalStorage () {
        this.levels = [];
        var jsonStr = localStorage.getItem("levels");
        console.log(jsonStr);
        try {
            var json = JSON.parse(jsonStr);
            for (var i = 0; i < json.length; ++i) {
                var level = json[i];
                if (level.id === undefined) {
                    level.id = this.getUnusedId();
                }
                this.levels.push(level);
            }
        } catch (err) {
            this.create("blank");
        }
    }

    private copyLevel (level: Level): Level {
        var copy: Level = {
            id: level.id,
            name: level.name,
            layoutId: level.layoutId,
            monsters: [],
            items: []
        };
        return copy;
    }

    nameAlreadyExists(name: string) {
        for (var i = 0; i < this.levels.length; ++i) {
            if (this.levels[i].name.toLowerCase() === name.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    getAll() {
        return this.levels;
    }
}