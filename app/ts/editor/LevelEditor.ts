class LevelEditor extends Editor {

    public tool: LevelTool;
    private levelManager: LevelManager;

    constructor (canvas: HTMLCanvasElement, levelManager: LevelManager) {
        super(0, 0, canvas);
        this.levelManager = levelManager;
    }

    update (): void {
    }

    render(graphics: Phaser.Graphics): void {
        super.renderGrid(graphics);
    }

    generate () {
        return [];
    }

    clickAt (x: number, y: number) {

    }

    changeTool (tool: LevelTool) {
        this.tool = tool;
    }
}