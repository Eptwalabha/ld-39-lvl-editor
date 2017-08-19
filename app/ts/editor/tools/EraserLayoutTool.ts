class EraserLayoutTool extends LayoutTool {

    process (layout: Layout) {
        if (layout.layout[this.position.y] && layout.layout[this.position.y][this.position.x]>= 0) {
            layout.layout[this.position.y][this.position.x] = null;
        }
    }

    endProcess (layout: Layout) {}
}