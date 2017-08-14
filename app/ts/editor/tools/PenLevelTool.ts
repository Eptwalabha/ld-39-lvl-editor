class PenLevelTool extends LevelTool {

    private entityType: number;
    private value: number;

    constructor () {
        super();
        this.value = 1;
    }

    process(x: number, y: number, level: Level) {
    }

    setValue (entityType: number, value: number) {
        this.entityType = entityType;
        this.value = value;
    }


}