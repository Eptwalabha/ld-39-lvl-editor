class PaletteUIEditor extends UIEditor {

    private html_layouts: HTMLElement;
    private layoutEditor: LayoutEditor;
    private pen: PenTool;
    private eraser: EraserTool;


    constructor (element: HTMLElement, editor: LayoutEditor) {
        super(element, editor);
        this.layoutEditor = editor;
        this.html_layouts = element.querySelector(".ui-tool-content") as HTMLElement;
        this.bindMenus(element);
        this.bindTiles();
        this.pen = new PenTool();
        this.eraser = new EraserTool();
        this.layoutEditor.changeTool(this.pen);
    }

    private bindMenus (element: HTMLElement) {
        var self = this;
        element.querySelector("#ui-palette-pen").addEventListener('click', function () {
            self.layoutEditor.changeTool(self.pen);
            self.selectMenu(this);
        });
        element.querySelector("#ui-palette-eraser").addEventListener('click', function () {
            self.layoutEditor.changeTool(self.eraser);
            self.selectMenu(this);
        });
    }

    private bindTiles () {
        var self = this;
        for (var i = 0; i < 50; ++i) {
            var tile = document.createElement('span');
            tile.classList.add("palette");
            if (i === 0) tile.classList.add("selected");
            tile.dataset.tileValue = "" + i;
            this.html_layouts.appendChild(tile);
            tile.addEventListener('click', function () {
                self.pen.setValue(parseInt(this.dataset.tileValue, 10));
                self.selectTile(this);
            });
        }
    }

    private selectMenu(menu: HTMLImageElement) {
        var images = this.header.querySelectorAll("img");
        for (var i = 0; i < images.length; ++i) {
            images[i].classList.remove("selected");
        }
        menu.classList.add("selected");
    }

    private selectTile (tile: HTMLSpanElement) {
        var tiles = this.html_layouts.querySelectorAll(".palette");
        for (var j = 0; j < tiles.length; ++j) {
            tiles[j].classList.remove("selected");
        }
        tile.classList.add("selected");
    }
}