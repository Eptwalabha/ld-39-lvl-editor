class PenLayoutTool extends LayoutTool {

    private value: number;

    constructor () {
        super();
        this.value = 1;
    }

    process(x: number, y: number, layout: Layout) {
        if (!layout.layout[y]) {
            layout.layout[y] = [];
        }
        layout.layout[y][x] = this.value;
    }

    setValue (value: number) {
        this.value = value;
    }


}