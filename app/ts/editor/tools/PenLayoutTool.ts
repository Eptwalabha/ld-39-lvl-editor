class PenLayoutTool extends LayoutTool {

    private value: number;

    constructor () {
        super();
        this.value = 1;
    }

    process(x: number, y: number, layout: Layout) {
        if (x < 0 || y < 0) return;
        if (!layout.layout[y]) {
            layout.layout[y] = [];
        }
        layout.layout[y][x] = this.value;
    }

    endProcess(x: number, y: number, layout: Layout) {}

    setValue (value: number) {
        this.value = value;
    }


}