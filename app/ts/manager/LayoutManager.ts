interface Layout {
    id: number,
    name: string,
    layout: Array<Array<number>>
}

class LayoutManager extends Manager {

    private layouts: Array<Layout>;
    private current: number;

    constructor () {
        super();
        this.loadFromLocalStorage();
        this.current = this.layouts[0].id;
    }

    create(name: string): Layout {
        var newLayout = {
            name: name,
            layout: [],
            id: this.getUnusedId()
        };
        this.layouts.push(newLayout);
        return newLayout;
    }

    copy(id: number, name: string) {
        var layout = this.get(id);
        if (layout) {
            var newLayout = this.copyLayout(layout);
            newLayout.id = this.getUnusedId();
            newLayout.name = name;
            this.layouts.push(newLayout);
            return newLayout;
        }
        return false;
    }

    remove(id: number) {
        var index = this.getIndexOf(id);
        if (index >= 0) {
            this.layouts.splice(index, 1);
            if (index >= this.layouts.length) {
                index--;
            }
            if (index >= 0) {
                return this.layouts[index];
            } else {
                return this.create("no name");
            }
        }
        return null;
    }

    private getIndexOf (id: number) {
        for (var i = 0; i < this.layouts.length; ++i) {
            if (this.layouts[i].id === id) {
                return i;
            }
        }
        return null;
    }

    save () {
        var layouts: Array<Layout> = [];
        for (var l = 0; l < this.layouts.length; ++l) {
            var layout = this.copyLayout(this.layouts[l]);
            layouts.push(layout);
        }
        var json = JSON.stringify(layouts);
        localStorage.setItem("layouts", json);
    }

    get (id: number) {
        for (var i = 0; i < this.layouts.length; ++i) {
            if (this.layouts[i].id === id) return this.layouts[i];
        }
        return null;
    }

    setCurrent (id: number): Layout {
        if (this.idExists(id)) this.current = id;
        return this.getCurrent();
    }

    getCurrent () {
        return this.get(this.current);
    }

    private idExists (id: number): boolean {
        for (var i = 0; i < this.layouts.length; ++i) {
            if (this.layouts[i].id === id) return true;
        }
        return false;
    }

    private getUnusedId (): number {
        var id: number = Date.now(),
            alreadyUsed: boolean;
        do {
            id++;
            alreadyUsed = false;
            for (var i = 0; i < this.layouts.length; ++i) {
                if (this.layouts[i].id === id) {
                    alreadyUsed = true;
                    break;
                }
            }
        } while (alreadyUsed);
        return id;
    }

    private loadFromLocalStorage () {
        this.layouts = [];
        var jsonStr = localStorage.getItem("layouts");
        try {
            var json = JSON.parse(jsonStr);
            for (var i = 0; i < json.length; ++i) {
                var layout = json[i];
                if (layout.id === undefined) {
                    layout.id = this.getUnusedId();
                }
                this.layouts.push(layout);
            }
        } catch (err) {
            this.create("blank");
        }
    }

    private copyLayout (layout: Layout): Layout {
        var copy: Layout = {
            id: layout.id,
            name: layout.name,
            layout: []
        };
        for (var j = 0; j < layout.layout.length; ++j) {
            copy.layout[j] = [];
            if (!layout.layout[j]) {
                continue;
            }
            for (var i = 0; i < layout.layout[j].length; ++i) {
                if (!layout.layout[j][i] && layout.layout[j][i] !== 0) {
                    copy.layout[j][i] = null;
                } else {
                    copy.layout[j][i] = layout.layout[j][i];
                }
            }
        }
        return copy;
    }

    nameAlreadyExists(name: string) {
        for (var i = 0; i < this.layouts.length; ++i) {
            if (this.layouts[i].name.toLowerCase() === name.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    getAll() {
        return this.layouts;
    }
}