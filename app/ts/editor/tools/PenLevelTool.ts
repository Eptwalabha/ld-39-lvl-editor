class PenLevelTool extends LevelTool {

    private entityType: number;
    private value: number;

    constructor () {
        super();
        this.down = false;
        this.value = 1;
    }

    process(x: number, y: number, level: Level) {
        super.startClick(x, y);
        if (!this.down) {
            this.down = true;
        }
    }

    endProcess(x: number, y: number, level: Level) {
        super.endClick(x, y);
    }

    setValue (entityType: number, value: number) {
        this.entityType = entityType;
        this.value = value;
    }
}