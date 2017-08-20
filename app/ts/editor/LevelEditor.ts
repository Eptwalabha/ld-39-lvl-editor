class LevelEditor extends Editor {
    public current: Level;
    public tool: LevelTool;
    private levelManager: LevelManager;
    private layoutManager: LayoutManager;
    public currentLayout: Layout;

    constructor (canvas: HTMLCanvasElement, levelManager: LevelManager, layoutManager: LayoutManager) {
        super(0, 0, canvas);
        this.levelManager = levelManager;
        this.layoutManager = layoutManager;
        var current = this.levelManager.getCurrent();
        this.load(current.id);
    }

    update (): void {
    }

    render(graphics: Phaser.Graphics, alpha: number = 1): void {
        super.renderGrid(graphics);
        if (this.currentLayout) {
            LayoutEditor.renderLayout(graphics, this.currentLayout, this.x, this.y, this.zoom, 0.2);
            this.tool.render(graphics, this.currentLayout, this.x, this.y, this.zoom);
        } else {
            graphics.beginFill(0xff0000, 0.1);
            graphics.drawRect(0, 0, graphics.width, graphics.height);
            graphics.endFill();
        }

        var self = this,
            z2 = this.zoom / 2,
            offsetX = this.x + z2,
            offsetY = this.y + z2;

        this.current.items.forEach(function (item: LevelEntity) {
            graphics.beginFill(LayoutEditor.getColor(item.value), alpha);
            graphics.drawCircle(
                item.position.x * self.zoom + offsetX,
                item.position.y * self.zoom + offsetY,
                self.zoom);
            graphics.endFill();
        });

        this.current.monsters.forEach(function (monster: LevelEntity) {
            graphics.beginFill(LayoutEditor.getColor(monster.value), alpha);
            var x = monster.position.x * self.zoom + offsetX;
            var y = monster.position.y * self.zoom + offsetY;
            graphics.drawTriangle([
                new Phaser.Point(x - z2, y + z2),
                new Phaser.Point(x, y - z2),
                new Phaser.Point(x + z2, y + z2)
            ]);
            graphics.endFill();
        });
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

    changeTool (tool: LevelTool) {
        this.tool = tool;
    }

    load(id: number) {
        this.current = this.levelManager.setCurrent(id);
        this.currentLayout = this.layoutManager.get(this.current.layoutId);
    }


    copy (ui: LevelUIEditor, name: string) {
        var level = this.levelManager.copy(this.current.id, name);
        if (level) {
            this.current = level;
            ui.addNewLine(this.current);
            ui.setSelectedLevel(this.current.id);
        }
    }

    deleteLevel (ui: LevelUIEditor) {
        var newCurrent = this.levelManager.remove(this.current.id);
        if (newCurrent) {
            this.current = newCurrent;
        }
        ui.updateList();
        this.load(this.current.id);
    }

    create (name: string) {
        return this.levelManager.create(name);
    }

    save () {
        this.levelManager.save();
    }

    nameAlreadyExists(name: string) {
        return this.levelManager.nameAlreadyExists(name);
    }

    updateList(ui: LevelUIEditor) {
        var levels = this.levelManager.getAll();
        for (var i = 0; i < levels.length; ++i) {
            var level = levels[i];
            ui.addNewLine(level, level.id === this.current.id);
        }
    }

    edit(id: number) {
        var level = this.levelManager.get(id);
        if (level) {
            var dialog = document.getElementById("dialog-edit-level");
            (dialog.querySelector("h1 span.level-id").innerHTML) = level.id.toString();
            (dialog.querySelector("form input[name='level-id']") as HTMLInputElement).value = level.id.toString();
            (dialog.querySelector("form input[name='level-name']") as HTMLInputElement).value = level.name;
            var select = dialog.querySelector("form select[name='layout-id']") as HTMLSelectElement;
            select.innerHTML = "";
            var layouts = this.layoutManager.getAll();
            layouts.forEach(function (layout: Layout) {
                var option = document.createElement("option");
                option.value = layout.id.toString();
                option.innerHTML = layout.name;
                option.selected = (level.layoutId === layout.id);
                select.appendChild(option);
            });
            dialog.classList.add("open");
        }
    }

    updateLevel (id: number, name: string, layoutId: number) {
        var level = this.levelManager.get(id);
        if (level) {
            level.layoutId = layoutId;
            level.name = name;
            this.load(id);
        }
    }
}