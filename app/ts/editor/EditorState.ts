class EditorState extends Phaser.State {
    private layoutEditor: LayoutEditor;
    private levelEditor: LevelEditor;
    private currentEditor: Editor;
    private x: number;
    private y: number;
    private graphics: Phaser.Graphics;
    private coordinates: HTMLElement;
    private pointer: {x: number, y: number};
    private leftClickDown: boolean;

    preload () {
        this.game.load.atlas("tile", "assets/atlas/tiles.png", "assets/atlas/tiles.json");
    }

    create () {
        this.leftClickDown = false;
        this.game.stage.backgroundColor = "#ddd";
        this.game.stage.smoothed = false;
        this.game.canvas.oncontextmenu = function (e: PointerEvent) {
            e.preventDefault();
        };
        this.camera.flash(0x000000);
        var layoutManager = new LayoutManager();
        var levelManager = new LevelManager();
        var monsterManager = new MonsterManager();
        var itemManager = new ItemManager();

        var self = this;
        this.layoutEditor = new LayoutEditor(this.game.canvas, layoutManager);
        this.layoutEditor.onAction = function () {
            self.currentEditor = self.layoutEditor;
        };
        this.levelEditor = new LevelEditor(this.game.canvas, levelManager, layoutManager);
        this.levelEditor.onAction = function () {
            self.currentEditor = self.levelEditor;
        };

        this.currentEditor = this.layoutEditor;

        var levelTool = document.getElementById("tool-level") as HTMLElement;
        var entityTool = document.getElementById("tool-entity") as HTMLElement;
        var layoutTool = document.getElementById("tool-layout") as HTMLElement;
        var tileTool = document.getElementById("tool-tile") as HTMLElement;
        this.coordinates = document.getElementById("mouse-position") as HTMLElement;
        this.pointer = {x: 0, y: 0};

        new LevelUIEditor(levelTool, this.levelEditor);
        new EntityUIEditor(entityTool, this.levelEditor, itemManager, monsterManager);
        new LayoutUIEditor(layoutTool, this.layoutEditor);
        new TileUIEditor(tileTool, this.layoutEditor);

        this.graphics = this.game.add.graphics();
        this.game.input.mouse.capture = true;

        this.camera.fade(0xffffff, 300);
    }

    update () {
        var p = this.game.input.activePointer.position;
        if (this.game.input.activePointer.rightButton.isDown) {
            this.levelEditor.dragStart(p.x, p.y);
            this.layoutEditor.dragStart(p.x, p.y);
        } else {
            this.levelEditor.dragEnd();
            this.layoutEditor.dragEnd();
        }

        this.pointer = this.currentEditor.coordinatesAt(p.x, p.y);
        this.currentEditor.mouseMove(this.pointer.x, this.pointer.y);
        if (this.game.input.activePointer.leftButton.isDown) {
            this.leftClickDown = true;
            this.currentEditor.clickDown();
        } else if (this.leftClickDown) {
            this.leftClickDown = false;
            this.currentEditor.endClick();
        }

        this.currentEditor.update();
    }

    render () {
        this.graphics.clear();
        this.currentEditor.render(this.graphics);
        this.coordinates.innerText = "x = " + this.pointer.x + " ; y = " + this.pointer.y;
    }
}