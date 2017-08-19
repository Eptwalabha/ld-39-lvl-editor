enum PenLevelToolType {
    LEVEL_ITEM = 0,
    ITEM = 1,
    MONSTER = 2
}

class PenLevelTool extends LevelTool {

    private entityType: number;
    private value: number;

    constructor () {
        super();
        this.down = false;
        this.value = 1;
    }

    process(level: Level) {
        super.startClick();
        if (!this.down) {
            this.down = true;
        }
    }

    endProcess(level: Level) {
        super.endClick();
        PenLevelTool.removeLevelEntitiesAt(level, this.positionEnd.x, this.positionEnd.y);
        switch (this.entityType) {
            case 1:
                this.addItemToLevel(level);
                break;
            case 2:
                this.addMonsterToLevel(level);
                break;
        }
    }

    setValue (entityType: number, value: number) {
        this.entityType = entityType;
        this.value = value;
    }

    static removeLevelEntitiesAt (level: Level, x: number, y: number) {
        level.items = level.items.filter(function (item: LevelEntity) {
            return item.position.x !== x || item.position.y !== y;
        });
        level.monsters = level.monsters.filter(function (monster: LevelEntity) {
            return monster.position.x !== x || monster.position.y !== y;
        });
    }

    private addItemToLevel (level: Level) {
        var item: LevelEntity = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            value: this.value
        };
        level.items.push(item);
    }

    private addMonsterToLevel (level: Level) {
        var monster: LevelEntity = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            value: this.value
        };
        level.monsters.push(monster);
    }
}