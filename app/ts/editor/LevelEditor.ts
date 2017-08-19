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