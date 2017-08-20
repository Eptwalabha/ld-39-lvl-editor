class EntityUIEditor extends UIEditor {

    private levelEditor: LevelEditor;
    private htmlSection: HTMLElement;
    private pen: PenLevelTool;
    private eraser: EraserLevelTool;
    private itemManager: ItemManager;
    private monsterManager: MonsterManager;

    constructor (element: HTMLElement, editor: LevelEditor, itemManager: ItemManager, monsterManager: MonsterManager) {
        super(element, editor);
        this.levelEditor = editor;
        this.itemManager = itemManager;
        this.monsterManager = monsterManager;
        this.htmlSection = element.querySelector(".ui-section-content") as HTMLElement;
        this.bindMenus(element);
        this.buildMenus();
        this.pen = new PenLevelTool();
        this.eraser = new EraserLevelTool();
        this.levelEditor.changeTool(this.pen);
    }

    private bindMenus (element: HTMLElement) {
        var self = this;
        element.querySelector("#ui-entity-game-item").addEventListener('click', function () {
            // TODO
            // self.levelEditor.changeTool(self.pen);
            self.actionOnEditor();
            self.selectMenu(this);
            self.updateTool(this.id, PenLevelToolType.ITEM);
        });
        element.querySelector("#ui-entity-monster").addEventListener('click', function () {
            // TODO
            self.actionOnEditor();
            self.selectMenu(this);
            self.updateTool(this.id, PenLevelToolType.MONSTER);
        });
        element.querySelector("#ui-entity-eraser").addEventListener('click', function () {
            self.actionOnEditor();
            self.selectMenu(this);
            self.levelEditor.changeTool(self.eraser);
        });
    }

    private selectMenu(menu: HTMLImageElement) {
        var images = this.header.querySelectorAll("img");
        for (var i = 0; i < images.length; ++i) {
            images[i].classList.remove("selected");
        }
        menu.classList.add("selected");
        this.toggleMenu(menu.id)
    }

    private toggleMenu (menuId: string) {
        var result = this.htmlSection.querySelector("div[data-menu-id='" + menuId + "']");
        if (result) {
            var menus = this.htmlSection.querySelectorAll("div.toggle-menu-tab");
            for (var i in menus) {
                if (!menus.hasOwnProperty(i)) continue;
                menus[i].classList.remove("active");
            }
            result.classList.add("active");
            this.activeMenu(result as HTMLElement);
        }
    }

    private activeMenu(activeMenu: HTMLElement) {
    }

    private updateTool(menuId: string, type: PenLevelToolType) {
        var tile = this.htmlSection
            .querySelector("div[data-menu-id='" + menuId + "']")
            .querySelector("span.tile.selected") as HTMLSpanElement;
        if (tile) {
            this.pen.setValue(type, parseInt(tile.dataset.itemId, 10));
            this.levelEditor.changeTool(this.pen);
        }
    }

    private buildMenus() {
        var entityContainer = this.htmlSection.querySelector("*[data-menu-id='ui-entity-game-item']");
        this.buildMenu(entityContainer, this.itemManager.items, PenLevelToolType.ITEM);
        var monsterContainer = this.htmlSection.querySelector("*[data-menu-id='ui-entity-monster']");
        this.buildMenu(monsterContainer, this.monsterManager.monsters, PenLevelToolType.MONSTER);
    }

    private buildMenu (container: Element, entities: Array<Entity>, type: PenLevelToolType) {
        var i: number;
        var self = this;
        for (i = 0; i < entities.length; ++i) {
            var entity = document.createElement('span');
            entity.classList.add("tile");
            if (i === 0) entity.classList.add("selected");
            entity.dataset.itemId = entities[i].id.toString();
            entity.title = entities[i].name;
            entity.style.backgroundColor = "#" + ("000000" + LayoutEditor.getColor(i).toString(16)).substr(-6);
            container.appendChild(entity);
            entity.addEventListener('click', function () {
                self.pen.setValue(type, parseInt(this.dataset.itemId, 10));
                self.selectTile(this);
            });
        }
    }

    private selectTile (tile: HTMLSpanElement) {
        this.actionOnEditor();
        var container: HTMLElement = tile.parentElement;
        var tiles = container.querySelectorAll(".tile");
        for (var j = 0; j < tiles.length; ++j) {
            tiles[j].classList.remove("selected");
        }
        tile.classList.add("selected");
    }
}
