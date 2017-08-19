abstract class Tool {
    protected down: boolean;
    protected positionStart: {x: number, y: number};
    protected positionEnd: {x: number, y: number};
    public position: {x: number, y: number};

    constructor() {
        this.down = false;
        this.positionStart = {x: 0, y: 0};
        this.positionEnd = {x: 0, y: 0};
        this.position = {x: 0, y: 0};
    }

    protected startClick () {
        if (!this.down) {
            this.positionStart.x = this.position.x;
            this.positionStart.y = this.position.y;
            this.down = true;
        }
    }

    protected endClick () {
        this.down = false;
        this.positionEnd.x = this.position.x;
        this.positionEnd.y = this.position.y;
    }

    moveTo (x: number, y: number) {
        this.position.x = x;
        this.position.y = y;
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