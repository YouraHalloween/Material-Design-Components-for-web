import { MDCDrawer } from '@material/drawer';
declare class MDCDrawerSyg extends MDCDrawer {
    groupAll: boolean;
    group?: NodeListOf<Element> | null;
    constructor(root: Element, ...args: any[]);
    /**
     * Нарисовать активные списки меню и убрать не активные
     * @param {string} menuIndex
     */
    renderActive(index?: number): void;
    /**
     * Вернуть активную группу
     * @returns number
     */
    getActiveGroupIndex(): number;
}
export { MDCDrawerSyg };
