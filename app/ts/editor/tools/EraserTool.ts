class EraserTool extends LayoutTool {

    process(x: number, y: number, layout: Layout) {
        if (layout.layout[y] && layout.layout[y][x]) {
            layout.layout[y][x] = 0;
        }
    }

}