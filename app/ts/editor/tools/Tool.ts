abstract class Tool {
    protected down: boolean;
    protected positionStart: {x: number, y: number};
    protected positionEnd: {x: number, y: number};
    protected position: {x: number, y: number};

    constructor() {
        this.down = false;
        this.positionStart = {x: 0, y: 0};
        this.positionEnd = {x: 0, y: 0};
        this.position = {x: 0, y: 0};
    }

    protected startClick (x: number, y: number) {
        if (!this.down) {
            this.positionStart.x = x;
            this.positionStart.y = y;
            this.down = true;
        }
        this.position.x = x;
        this.position.y = y;
    }

    protected endClick (x: number, y: number) {
        this.down = false;
        this.positionEnd.x = x;
        this.positionEnd.y = y;
    }

    protected getSelectedBox() {
        return {
            x: this.positionStart.x,
            y: this.positionStart.y,
            w: this.positionEnd.x - this.positionStart.x,
            h: this.positionEnd.y - this.positionStart.y
        };
    }
}