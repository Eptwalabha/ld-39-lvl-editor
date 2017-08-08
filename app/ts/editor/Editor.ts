abstract class Editor {

    protected x: number;
    protected y: number;
    protected w: number;
    protected h: number;
    protected zoom: number;
    private dragging: boolean;
    private dragDiffX: number;
    private dragDiffY: number;

    constructor (x: number, y: number, w: number, h: number) {
        this.updateOrigin(x, y);
        this.updateDimensions(w, h);
        this.zoom = 20;
        this.dragging = false;
    }

    abstract update(): void;
    abstract render(graphics: Phaser.Graphics): void;
    abstract clickAt(x: number, y: number): any;
    abstract generate(): any;

    updateOrigin(x: number, y: number): void {
        this.x = x;
        this.y = y;
    };

    updateDimensions(w: number, h: number) {
        this.w = w;
        this.h = h;
    }

    renderGrid(graphics: Phaser.Graphics) {
        var x = (this.x > 0) ? - Math.floor(this.x / this.zoom) : Math.ceil(Math.abs(this.x) / this.zoom);
        var y = (this.y > 0) ? - Math.floor(this.y / this.zoom) : Math.ceil(Math.abs(this.y) / this.zoom);
        var offsetX = x * this.zoom + this.x;
        var offsetY = y * this.zoom + this.y;
        var color, thickness;

        do {
            color = 0xcccccc;
            thickness = 1;

            if (x % 5 === 0) {
                color = 0x555555;
                thickness = 1;
            }
            if (x === 0) {
                color = 0xff0000;
                thickness = 2;
            }
            graphics.lineStyle(thickness, color, .5);
            graphics.moveTo(offsetX, 0);
            graphics.lineTo(offsetX, this.h);
            graphics.endFill();
            offsetX += this.zoom;
            x++;

        } while (offsetX < this.w);

        do {
            color = 0xcccccc;
            thickness = 1;

            if (y % 5 === 0) {
                color = 0x555555;
                thickness = 1;
            }
            if (y === 0) {
                color = 0xff0000;
                thickness = 2;
            }
            graphics.lineStyle(thickness, color, 1);
            graphics.moveTo(0, offsetY);
            graphics.lineTo(this.w, offsetY);
            graphics.endFill();
            offsetY += this.zoom;
            y++;

        } while (offsetY < this.h);


    }

    dragStart(x: number, y: number) {
        if (!this.dragging) {
            this.dragging = true;
            this.dragDiffX = this.x - x;
            this.dragDiffY = this.y - y;
        }
        if (x + this.dragDiffX >= this.zoom / 2) {
            this.dragDiffX = this.zoom / 2 - x;
        }
        if (y + this.dragDiffY >= this.zoom / 2) {
            this.dragDiffY = this.zoom / 2 - y;
        }
        this.x = this.dragDiffX + x;
        this.y = this.dragDiffY + y;
    }

    dragEnd () {
        this.dragging = false;
    }

    coordinatesAt (x: number, y: number) {
        return {
            x: Math.floor((x - this.x) / this.zoom),
            y: Math.floor((y - this.y) / this.zoom)
        }
    }
}