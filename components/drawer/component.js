import { MDCDrawer } from '@material/drawer';

const MENU_INDEX_VISIBLE_ALL = '--visible-all';

class MDCDrawer_Syg extends MDCDrawer {

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
                for (const item of this.groupActive) {
                    if (item.getAttribute('menu-index') != menuIndex) {
                        item.classList.remove('active');
                    }
                }
            }
        }
        let filtr = menuIndex == MENU_INDEX_VISIBLE_ALL ? `div` : `div[menu-index="${menuIndex}"]`;
        let groups = this.list.root.querySelectorAll(filtr);
        if (groups.length > 0) {
            for (const item of groups) {
                item.classList.add('active');
            }
        }
        this.groupActive = groups;
    }
}

export { MDCDrawer_Syg }