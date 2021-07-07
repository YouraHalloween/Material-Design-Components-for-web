import { MDCDrawer } from '@material/drawer';

class MDCDrawerSyg extends MDCDrawer {
    public groupAll: boolean = false;
    public group?: NodeListOf<Element> | null = null;

    constructor(root: Element, ...args: any[]) {
        super(root, ...args);

        if (this.list) {
            this.group = this.list.root.querySelectorAll('div.group');
        }
    }

    /**
     * Нарисовать активные списки меню и убрать не активные
     * @param {string} menuIndex
     */
    renderActive(index: number = -1): void {
        // Все группы выведены
        this.groupAll = index === -1;

        this.group?.forEach((item, key) => {
            if (index === -1 || index === key) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * Вернуть активную группу
     * @returns number
     */
    getActiveGroupIndex(): number {
        if (this.group && !this.groupAll) {
            for (let index = 0; index < this.group.length; index++) {
                const element: Element = this.group[index];
                if (element.classList.contains('active')) {
                    return index;
                }
            }
        }
        return -1;
    }
}

export { MDCDrawerSyg };
