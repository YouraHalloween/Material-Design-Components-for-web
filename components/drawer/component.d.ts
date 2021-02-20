import { MDCDrawer } from '@material/drawer';
declare class MDCDrawerSyg extends MDCDrawer {
    menuIndexActive: string;
    groupActive?: NodeListOf<Element> | null;
    constructor(root: Element, ...args: any[]);
    /**
     * Нарисовать активные списки меню и убрать не активные
     * @param {string} menuIndex
     */
    renderActiveGroup(menuIndex: string): void;
}
export { MDCDrawerSyg };
