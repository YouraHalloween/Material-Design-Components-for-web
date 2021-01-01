import { MDCDrawer } from '@material/drawer';

const MENU_INDEX_VISIBLE_ALL = '--visible-all';
class MDCDrawerSyg extends MDCDrawer {

    constructor(...args) {
        super(...args);

        this.groupActive = this.list.root.querySelectorAll('div.active');
    }

    /**
     * Нарисовать активные списки меню и убрать не активные
     * @param {string} menuIndex
     */
    renderActiveGroup(menuIndex) {
        if (menuIndex != MENU_INDEX_VISIBLE_ALL) {
            if (this.groupActive != null) {
                for (const key in this.groupActive) {
                    if (this.groupActive.hasOwnProperty(key)) {
                        if (this.groupActive[key].getAttribute('menu-index') != menuIndex) {
                            this.groupActive[key].classList.remove('active');
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        let filtr = menuIndex == MENU_INDEX_VISIBLE_ALL ? `div` : `div[menu-index="${menuIndex}"]`;
        let groups = this.list.root.querySelectorAll(filtr);
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
}

export { MDCDrawerSyg }