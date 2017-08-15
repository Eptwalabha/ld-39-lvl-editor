class EntityUIEditor extends UIEditor {

    private levelEditor: LevelEditor;
    private htmlSection: HTMLElement;
    private pen: PenLevelTool;
    private itemManager: ItemManager;
    private monsterManager: MonsterManager;

    constructor (element: HTMLElement, editor: LevelEditor, itemManager: ItemManager, monsterManager: MonsterManager) {
        super(element, editor);
        this.levelEditor = editor;
        this.itemManager = itemManager;
        this.monsterManager = monsterManager;
        this.htmlSection = element.querySelector(".ui-section-content") as HTMLElement;
        this.bindMenus(element);
        this.pen = new PenLevelTool();
        this.levelEditor.changeTool(this.pen);
    }

    private bindMenus (element: HTMLElement) {
        var self = this;
        element.querySelector("#ui-entity-level").addEventListener('click', function () {
            // TODO
            self.levelEditor.changeTool(self.pen);
            self.selectMenu(this);
        });
        element.querySelector("#ui-entity-game-item").addEventListener('click', function () {
            // TODO
            self.levelEditor.changeTool(self.pen);
            self.selectMenu(this);
        });
        element.querySelector("#ui-entity-monster").addEventListener('click', function () {
            // TODO
            self.levelEditor.changeTool(self.pen);
            self.selectMenu(this);
        });
        element.querySelector("#ui-entity-eraser").addEventListener('click', function () {
            // TODO eraser
            self.selectMenu(this);
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
        console.log(activeMenu.dataset);
    }
}
