class LayoutEditor extends Editor {
    public current: Layout;
    public tool: LayoutTool;
    private layoutManager: LayoutManager;

    constructor (canvas: HTMLCanvasElement, layoutManager: LayoutManager) {
        super(0, 0, canvas);
        this.layoutManager = layoutManager;
        this.current = this.layoutManager.getCurrent();
    }

    update (): void {
    }

    render(graphics: Phaser.Graphics, alpha: number = 1): void {
        super.renderGrid(graphics);
        LayoutEditor.renderLayout(graphics, this.current, this.x, this.y, this.zoom, alpha);
        this.tool.render(graphics, this.current, this.x, this.y, this.zoom);
    }

    generate () {
        return [];
    }

    clickDown () {
        if (this.tool.position.x < 0 || this.tool.position.y < 0) return;
        this.tool.process(this.current);
    }

    endClick () {
        this.tool.endProcess(this.current);
    }

    mouseMove (x: number, y: number) {
        this.tool.moveTo(x, y);
    }

    static renderLayout(graphics: Phaser.Graphics, theLayout: Layout, x: number, y: number, zoom: number, alpha: number = 1) {

        var layout = theLayout.layout;

        for (var j = 0; j < layout.length; ++j) {
            if (!layout[j]) continue;
            for (var i = 0; i < layout[j].length; ++i) {
                if (!layout[j][i] && layout[j][i] !== 0) continue;
                graphics.beginFill(LayoutEditor.getColor(layout[j][i]), alpha);
                graphics.drawRect(i * zoom + x, j * zoom + y, zoom, zoom);
                graphics.endFill();
            }
        }

    }

    load(id: number) {
        this.current = this.layoutManager.setCurrent(id);
    }

    create (name: string) {
        return this.layoutManager.create(name);
    }

    save () {
        this.layoutManager.save();
    }

    copy (ui: LayoutUIEditor, name: string) {
        var layout = this.layoutManager.copy(this.current.id, name);
        if (layout) {
            this.current = layout;
            ui.addNewLine(this.current);
            ui.setSelectedLayout(this.current.id);
        }
    }

    deleteLayout (ui: LayoutUIEditor) {
        var newCurrent = this.layoutManager.remove(this.current.id);
        if (newCurrent) {
            this.current = newCurrent;
        }
        ui.updateList();
    }

    changeTool (tool: LayoutTool) {
        this.tool = tool;
    }

    static getColor(param: number) {
        switch (param) {
            case 0: return 0xffffff;
            case 1: return 0x000000;
            case 2: return 0xff0000;
            case 3: return 0x00ff00;
            case 4: return 0x0000ff;
            case 5: return 0xdddddd;
            case 6: return 0x666666;
        }
        return 0x888888;
    }

    nameAlreadyExists(name: string) {
        return this.layoutManager.nameAlreadyExists(name);
    }

    updateList(ui: LayoutUIEditor) {
        var layouts = this.layoutManager.getAll();
        for (var i = 0; i < layouts.length; ++i) {
            var layout = layouts[i];
            ui.addNewLine(layout, layout.id === this.current.id);
        }
    }
}