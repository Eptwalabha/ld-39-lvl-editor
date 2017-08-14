class LevelEditor extends Editor {

    public tool: LevelTool;

    constructor (canvas: HTMLCanvasElement) {
        super(0, 0, canvas);
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