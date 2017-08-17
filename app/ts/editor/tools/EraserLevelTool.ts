class EraserLevelTool extends LevelTool {

    process(x: number, y: number, level: Level) {
        super.startClick(x, y);
    }

    endProcess(x: number, y: number, level: Level) {
        super.endClick(x, y);
    }
}