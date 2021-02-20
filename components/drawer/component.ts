import { MDCDrawer } from '@material/drawer';

const MENU_INDEX_VISIBLE_ALL: string = '--visible-all';

class MDCDrawerSyg extends MDCDrawer {
    public menuIndexActive: string = '';
    public groupActive?: NodeListOf<Element> | null = null;

    constructor(root: Element, ...args: any[]) {
        super(root, ...args);

        if (this.list) {
            this.groupActive = this.list.root.querySelectorAll('div.active');
        }
    }

    /**
     * Нарисовать активные списки меню и убрать не активные
     * @param {string} menuIndex
     */
    renderActiveGroup(menuIndex: string): void {
        //Убрать не активные меню
        if (menuIndex !== this.menuIndexActive) {
            if (menuIndex !== MENU_INDEX_VISIBLE_ALL) {
                if (this.groupActive != null) {
                    for (const key in this.groupActive) {
                        if (this.groupActive.hasOwnProperty(key)) {
                            if (
                                this.groupActive[key].getAttribute('menu-index') !==
                                menuIndex
                            ) {
                                this.groupActive[key].classList.remove('active');
                            }
                        } else {
                            break;
                        }
                    }
                }
            }
            //Добавить активные меню
            if (this.list) {
                const filtr: string =
                    menuIndex === MENU_INDEX_VISIBLE_ALL
                        ? `div`
                        : `div[menu-index="${menuIndex}"]`;
                const groups: NodeListOf<Element> = this.list.root.querySelectorAll(
                    filtr
                );
                if (groups.length > 0) {
                    for (const key in groups) {
                        if (groups.hasOwnProperty(key)) {
                            groups[key].classList.add('active');
                        } else {
                            break;
                        }
                    }
                }
                this.groupActive = groups;
            }
            this.menuIndexActive = menuIndex;
        }
    }
}

export { MDCDrawerSyg };
