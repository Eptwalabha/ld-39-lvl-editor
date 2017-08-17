abstract class LevelTool extends Tool {
    constructor() {
        super();
    }

    abstract process(x: number, y: number, level: Level);

    abstract endProcess(x: number, y: number, level: Level);

    render (graphics: Phaser.Graphics, layout: Layout, offsetX: number, offsetY: number, zoom: number) {
        graphics.beginFill(0x00ffff, 1);
        graphics.drawRect(this.position.x * zoom + offsetX, this.position.y * zoom + offsetY, zoom, zoom);
        graphics.endFill();
    }
}