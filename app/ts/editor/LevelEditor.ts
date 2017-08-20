class LevelEditor extends Editor {
    public current: Level;
    public tool: LevelTool;
    private levelManager: LevelManager;
    public currentLayout: Layout;

    constructor (canvas: HTMLCanvasElement, levelManager: LevelManager) {
        super(0, 0, canvas);
        this.levelManager = levelManager;
        this.current = this.levelManager.getCurrent();
    }

    update (): void {
    }

    render(graphics: Phaser.Graphics, alpha: number = 1): void {
        super.renderGrid(graphics);
        if (this.currentLayout) {
            LayoutEditor.renderLayout(graphics, this.currentLayout, this.x, this.y, this.zoom, 0.2);
            this.tool.render(graphics, this.currentLayout, this.x, this.y, this.zoom);
        }

        var self = this,
            z2 = this.zoom / 2,
            offsetX = this.x + z2,
            offsetY = this.y + z2;

        this.current.items.forEach(function (item: LevelEntity) {
            graphics.beginFill(LayoutEditor.getColor(item.value), alpha);
            graphics.drawCircle(
                item.position.x * self.zoom + offsetX,
                item.position.y * self.zoom + offsetY,
                self.zoom);
            graphics.endFill();
        });

        this.current.monsters.forEach(function (monster: LevelEntity) {
            graphics.beginFill(LayoutEditor.getColor(monster.value), alpha);
            var x = monster.position.x * self.zoom + offsetX;
            var y = monster.position.y * self.zoom + offsetY;
            graphics.drawTriangle([
                new Phaser.Point(x - z2, y + z2),
                new Phaser.Point(x, y - z2),
                new Phaser.Point(x + z2, y + z2)
            ]);
            graphics.endFill();
        });
    }

    generate () {
        return [];
    }

    clickDown () {
        if (this.tool.position.x < 0 || this.tool.position.y < 0) return;
        this.tool.process(this.current);
    }

    endClick () {
        this.tool.endProcess(this.current);
    }

    mouseMove (x: number, y: number) {
        this.tool.moveTo(x, y);
    }

    changeTool (tool: LevelTool) {
        this.tool = tool;
    }
}