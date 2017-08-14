class LayoutEditor extends Editor {
    public current: Layout;
    public tool: LayoutTool;
    private layoutManager: LayoutManager;

    constructor (canvas: HTMLCanvasElement, layoutManager) {
        super(0, 0, canvas);
        this.layoutManager = layoutManager;
        this.current = this.layoutManager.getCurrent();
    }

    update (): void {
    }

    render(graphics: Phaser.Graphics): void {
        super.renderGrid(graphics);
        this.renderLayout(graphics);
    }

    generate () {
        return [];
    }

    clickAt (x: number, y: number) {
        if (x < 0 || y < 0) return;

        this.tool.process(x, y, this.current);
    }

    private renderLayout(graphics: Phaser.Graphics) {

        var layout = this.current.layout;

        for (var y = 0; y < layout.length; ++y) {
            if (!layout[y]) continue;
            for (var x = 0; x < layout[y].length; ++x) {
                if (!layout[y][x] && layout[y][x] !== 0) continue;
                graphics.beginFill(LayoutEditor.getColor(layout[y][x]), 1);
                graphics.drawRect(x * this.zoom + this.x, y * this.zoom + this.y, this.zoom, this.zoom);
                graphics.endFill();
            }
        }

    }

    load(id: number) {
        this.current = this.layoutManager.setCurrent(id);
    }

    new (name: string) {
        return this.layoutManager.new(name);
    }

    save () {
        this.layoutManager.save();
    }

    copy (ui: LayoutUIEditor, name: string) {
        var layout = this.layoutManager.copy(this.current.id, name);
        if (layout) {
            this.current = layout;
            console.log(this.current.id, this.current.name);
            ui.addNewLine(this.current);
            ui.setSelectedLayout(this.current.id);
        }
    }

    delete (ui: LayoutUIEditor) {
        var newCurrent = this.layoutManager.delete(this.current.id);
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