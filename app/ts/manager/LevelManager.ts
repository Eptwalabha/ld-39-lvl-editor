interface Level {
    id: number,
    name: string,
    layoutId: number,
    monsters: Array<LevelEntity>,
    items: Array<LevelEntity>
}

interface LevelEntity {
    position: {x: number, y: number},
    value: number
}

class LevelManager extends Manager {

    private levels: Array<Level>;
    private current: number;

    constructor () {
        super();
        this.loadFromLocalStorage();
        this.current = this.levels[0].id;
    }

    create(name: string, layoutId: number): Level {
        var newLevel = {
            id: this.getUnusedId(),
            name: name,
            layoutId: layoutId,
            monsters: [],
            items: []
        };
        this.levels.push(newLevel);
        return newLevel;
    }

    copy(id: number, name: string) {
        var level = this.get(id);
        if (level) {
            var newLevel = this.copyLevel(level);
            newLevel.id = this.getUnusedId();
            newLevel.name = name;
            this.levels.push(newLevel);
            return newLevel;
        }
        return false;
    }

    remove(id: number) {
        return null;
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
            this.create("blank", 0);
        }
    }

    private copyLevel (level: Level): Level {
        var monsters = [];
        level.monsters.forEach(function (monster: LevelEntity) {
            monsters.push({
                position: {x: monster.position.x, y: monster.position.y},
                value: monster.value
            });
        });
        var items = [];
        level.items.forEach(function (item: LevelEntity) {
            items.push({
                position: {x: item.position.x, y: item.position.y},
                value: item.value
            });
        });
        return {
            id: level.id,
            name: level.name,
            layoutId: level.layoutId,
            monsters: monsters,
            items: items
        };
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