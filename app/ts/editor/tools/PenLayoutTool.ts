class PenLayoutTool extends LayoutTool {

    private value: number;

    constructor () {
        super();
        this.value = 1;
    }

    process(layout: Layout) {
        if (this.position.x < 0 || this.position.y < 0) return;
        if (!layout.layout[this.position.y]) {
            layout.layout[this.position.y] = [];
        }
        layout.layout[this.position.y][this.position.x] = this.value;
    }

    endProcess(layout: Layout) {}

    setValue (value: number) {
        this.value = value;
    }


}