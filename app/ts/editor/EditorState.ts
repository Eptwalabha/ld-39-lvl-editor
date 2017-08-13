class EditorState extends Phaser.State {
    private layoutEditor: LayoutEditor;
    private levelEditor: LevelEditor;
    private currentEditor: Editor;
    private x: number;
    private y: number;
    private graphics: Phaser.Graphics;
    private coordinates: HTMLElement;
    private pointer: {x: number, y: number};

    preload () {
        this.game.load.atlas("tile", "assets/atlas/tiles.png", "assets/atlas/tiles.json");
    }

    create () {
        this.game.stage.backgroundColor = "#ddd";
        this.game.stage.smoothed = false;
        this.game.canvas.oncontextmenu = function (e: PointerEvent) {
            e.preventDefault();
        };
        this.camera.flash(0x000000);
        this.layoutEditor = new LayoutEditor(this.game.canvas);
        this.levelEditor = new LevelEditor(this.game.canvas);
        this.currentEditor = this.layoutEditor;

        var layoutTool = document.getElementById("tool-layout") as HTMLElement;
        var paletteTool = document.getElementById("tool-palette") as HTMLElement;
        this.coordinates = document.getElementById("mouse-position") as HTMLElement;
        this.pointer = {x: 0, y: 0};

        new LayoutUIEditor(layoutTool, this.layoutEditor);
        new PaletteUIEditor(paletteTool, this.layoutEditor);

        this.graphics = this.game.add.graphics();
        this.game.input.mouse.capture = true;

        this.camera.fade(0xffffff, 300);
    }

    update () {
        var p = this.game.input.activePointer.position;
        this.pointer = this.currentEditor.coordinatesAt(p.x, p.y);
        if (this.game.input.activePointer.rightButton.isDown) {
            this.currentEditor.dragStart(p.x, p.y);
        } else {
            this.currentEditor.dragEnd();
        }

        if (this.game.input.activePointer.leftButton.isDown) {
            this.currentEditor.clickAt(this.pointer.x, this.pointer.y);
        }

        this.currentEditor.update();
    }

    render () {
        this.graphics.clear();
        this.currentEditor.render(this.graphics);
        this.coordinates.innerText = "x = " + this.pointer.x + " ; y = " + this.pointer.y;
    }
}