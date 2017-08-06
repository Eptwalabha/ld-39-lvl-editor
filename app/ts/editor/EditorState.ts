enum TOOL {
    ERASER,
    PEN
}

class EditorState extends Phaser.State {

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

        this.camera.fade(0xffffff, 300);
    }

    update () {

        if (this.game.input.mousePointer.isDown) {
            console.log('toto');
        }

    }

    render () {

    }

}