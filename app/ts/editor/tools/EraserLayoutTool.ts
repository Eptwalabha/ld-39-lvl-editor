class EraserLayoutTool extends LayoutTool {

    process(x: number, y: number, layout: Layout) {
        if (layout.layout[y] && layout.layout[y][x]>= 0) {
            layout.layout[y][x] = null;
        }
    }

}