class EntityUIEditor extends UIEditor {

    private levelEditor: LevelEditor;
    private htmlSection: HTMLElement;
    private pen: PenLevelTool;

    constructor (element: HTMLElement, editor: LevelEditor) {
        super(element, editor);
        this.levelEditor = editor;
        this.htmlSection = element.querySelector(".ui-section-content") as HTMLElement;
        this.bindMenus(element);
        this.bindTiles();
        this.pen = new PenLevelTool();
        // this.eraser = new EraserTool();
        this.levelEditor.changeTool(this.pen);
    }

    private bindMenus (element: HTMLElement) {
        var self = this;
        element.querySelector("#ui-entity-pen").addEventListener('click', function () {
            self.levelEditor.changeTool(self.pen);
            self.selectMenu(this);
        });
        element.querySelector("#ui-entity-eraser").addEventListener('click', function () {
            // TODO
            // self.levelEditor.changeTool(self.eraser);
            // self.selectMenu(this);
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
                self.pen.setValue(parseInt(this.dataset.tileValue, 10), 1);
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
        var tiles = this.htmlSection.querySelectorAll(".tile");
        for (var j = 0; j < tiles.length; ++j) {
            tiles[j].classList.remove("selected");
        }
        tile.classList.add("selected");
    }
}
