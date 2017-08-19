class EraserLevelTool extends LevelTool {

    process(level: Level) {
        super.startClick();
        PenLevelTool.removeLevelEntitiesAt(level, this.position.x, this.position.y);
    }

    endProcess(level: Level) {
        super.endClick();
    }
}