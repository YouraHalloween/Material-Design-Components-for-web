type TEventClickFn = (index: string, event: Event) => {};

class TLeftAppBarSyg {
    private _eventlick?: TEventClickFn;

    public root: Element;

    static attachTo(root: Element): TLeftAppBarSyg {
        return new TLeftAppBarSyg(root);
    }

    constructor(root: Element) {
        this.root = root;

        let itemActive: Element | null = this.root.querySelector(
            '.mdc-left-app-bar-item__label.active'
        );
        const items: NodeListOf<Element> = this.root.querySelectorAll(
            '.mdc-left-app-bar-item__label'
        );

        for (const key in items) {
            if (items.hasOwnProperty(key)) {
                const item: Element = items[key];
                const menuIndex: string | null = item.getAttribute('menu-index');
                item.addEventListener('click', (event: Event) => {
                    if (itemActive !== item) {
                        item.classList.add('active');
                        if (itemActive !== null) {
                            itemActive.classList.remove('active');
                        }
                        itemActive = item;
                        if (this._eventlick && menuIndex) {
                            this._eventlick(menuIndex, event);
                        }
                    }
                });
            }
        }
    }

    listen(fn: TEventClickFn): void {
        this._eventlick = fn;
    }
}

export { TLeftAppBarSyg };
