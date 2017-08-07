enum TOOL {
    ERASER,
    PEN
}

class EditorState extends Phaser.State {
    private layoutEditor: LayoutEditor;
    private levelEditor: LevelEditor;
    private currentEditor: Editor;
    private x: number;
    private y: number;
    private graphics: Phaser.Graphics;

    preload () {
        this.game.load.atlas("tile", "assets/atlas/tiles.png", "assets/atlas/tiles.json");
    }

    create () {
        this.game.stage.backgroundColor = "#eee";
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

        new UIWindowEditor(layoutTool, this.layoutEditor);
        new UIWindowEditor(paletteTool, this.layoutEditor);

        this.graphics = this.game.add.graphics();
        this.game.input.mouse.capture = true;

        this.camera.fade(0xffffff, 300);
    }

    update () {
        if (this.game.input.activePointer.rightButton.isDown) {
            var p = this.game.input.activePointer.position;
            this.currentEditor.dragStart(p.x, p.y);
        } else {
            this.currentEditor.dragEnd();
        }

        this.currentEditor.update();
    }

    render () {
        this.graphics.clear();
        this.currentEditor.render(this.graphics);
    }

}