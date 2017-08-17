class LevelEditor extends Editor {
    public current: Level;
    public tool: LevelTool;
    private levelManager: LevelManager;
    public currentLayout: Layout;

    constructor (canvas: HTMLCanvasElement, levelManager: LevelManager) {
        super(0, 0, canvas);
        this.levelManager = levelManager;
    }

    update (): void {
    }

    render(graphics: Phaser.Graphics, alpha: number = 1): void {
        super.renderGrid(graphics);
        if (this.currentLayout) {
            LayoutEditor.renderLayout(graphics, this.currentLayout, this.x, this.y, this.zoom, 0.2);
            this.tool.render(graphics, this.currentLayout, this.x, this.y, this.zoom);
        }
    }

    generate () {
        return [];
    }

    clickAt (x: number, y: number) {
        if (x < 0 || y < 0) return;
        this.tool.process(x, y, this.current);
    }

    endClickAt (x: number, y: number) {
        this.tool.endProcess(x, y, this.current);
    }

    changeTool (tool: LevelTool) {
        this.tool = tool;
    }
}