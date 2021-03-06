abstract class LayoutTool extends Tool {

    constructor() {
        super();
    }

    abstract process(layout: Layout);
    abstract endProcess(layout: Layout);

    render (graphics: Phaser.Graphics, layout: Layout, offsetX: number, offsetY: number, zoom: number) {
        graphics.beginFill(0x00ffff, 1);
        graphics.drawRect(this.position.x * zoom + offsetX, this.position.y * zoom + offsetY, zoom, zoom);
        graphics.endFill();
    }
}