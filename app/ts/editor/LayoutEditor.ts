class LayoutEditor extends Editor {

    constructor (canvas: HTMLCanvasElement) {
        super(0, 0, canvas.width, canvas.height);
    }

    update (): void {
    }

    render(graphics: Phaser.Graphics): void {
        super.renderGrid(graphics);
    }

    generate () {
        return [];
    }
}