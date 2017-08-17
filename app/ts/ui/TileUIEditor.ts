class TileUIEditor extends UIEditor {

    private htmlSection: HTMLElement;
    private layoutEditor: LayoutEditor;
    private pen: PenLayoutTool;
    private eraser: EraserLayoutTool;


    constructor (element: HTMLElement, editor: LayoutEditor) {
        super(element, editor);
        this.layoutEditor = editor;
        this.htmlSection = element.querySelector(".ui-section-content") as HTMLElement;
        this.bindMenus(element);
        this.bindTiles();
        this.pen = new PenLayoutTool();
        this.eraser = new EraserLayoutTool();
        this.layoutEditor.changeTool(this.pen);
    }

    private bindMenus (element: HTMLElement) {
        var self = this;
        element.querySelector("#ui-tile-pen").addEventListener('click', function () {
            self.layoutEditor.changeTool(self.pen);
            self.selectMenu(this);
        });
        element.querySelector("#ui-tile-eraser").addEventListener('click', function () {
            self.layoutEditor.changeTool(self.eraser);
            self.selectMenu(this);
        });
    }

    private bindTiles () {
        var self = this;
        for (var i = 0; i < 12; ++i) {
            var tile = document.createElement('span');
            tile.classList.add("tile");
            if (i === 0) tile.classList.add("selected");
            tile.dataset.tileValue = i.toString(10);
            tile.style.backgroundColor = "#" + ("000000" + LayoutEditor.getColor(i).toString(16)).substr(-6);
            this.htmlSection.appendChild(tile);
            tile.addEventListener('click', function () {
                self.pen.setValue(parseInt(this.dataset.tileValue, 10));
                self.selectTile(this);
            });
        }
    }

    private selectMenu(menu: HTMLImageElement) {
        this.actionOnEditor();
        var images = this.header.querySelectorAll("img");
        for (var i = 0; i < images.length; ++i) {
            images[i].classList.remove("selected");
        }
        menu.classList.add("selected");
    }

    private selectTile (tile: HTMLSpanElement) {
        this.actionOnEditor();
        var tiles = this.htmlSection.querySelectorAll(".tile");
        for (var j = 0; j < tiles.length; ++j) {
            tiles[j].classList.remove("selected");
        }
        tile.classList.add("selected");
    }
}