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
    }

    setValue (entityType: number, value: number) {
        this.entityType = entityType;
        this.value = value;
    }
}