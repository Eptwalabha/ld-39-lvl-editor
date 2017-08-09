class LayoutEditor extends Editor {
    public current: Layout;

    constructor (canvas: HTMLCanvasElement) {
        super(0, 0, canvas.width, canvas.height);
        this.current = {
            layout: [],
            name: "toto"
        };
    }

    update (): void {
    }

    render(graphics: Phaser.Graphics): void {
        super.renderGrid(graphics);
        this.renderLayout(graphics);
    }

    generate () {
        return [];
    }

    clickAt (x: number, y: number) {
        if (x < 0 || y < 0) return;

        if (!this.current.layout[y]) {
            this.current.layout[y] = [];
        }
        this.current.layout[y][x] = 1;
    }

    private renderLayout(graphics: Phaser.Graphics) {

        var layout = this.current.layout;

        for (var y = 0; y < layout.length; ++y) {
            if (!layout[y]) continue;
            for (var x = 0; x < layout[y].length; ++x) {
                if (!layout[y][x]) continue;

                graphics.beginFill(0x555555, 1);
                graphics.drawRect(x * this.zoom + this.x, y * this.zoom + this.y, this.zoom, this.zoom);
                graphics.endFill();
            }
        }

    }

    load(layout: Layout) {
        this.current = layout;
    }
}