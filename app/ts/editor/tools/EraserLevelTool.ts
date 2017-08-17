class EraserLevelTool extends LevelTool {

    process(x: number, y: number, level: Level) {
        var i = 0;
        for (i = 0; i < level.items.length; ++i) {
            var item = level.items[i];
            if (item.x === x && item.y === y) {
                level.items.splice(i, 1);
                return;
            }
        }
        for (i = 0; i < level.monsters.length; ++i) {
            var monster = level.monsters[i];
            if (monster.x === x && monster.y === y) {
                level.monsters.splice(i, 1);
                return;
            }
        }
    }

}