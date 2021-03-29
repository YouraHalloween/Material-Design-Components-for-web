import { MDCList } from '@material/list/component';
declare class TCollapseSyg extends MDCList {
    private icons;
    constructor(root: Element, ...args: any[]);
    private setClassByTimeout;
    isOpen(element: Element): boolean;
}
export { TCollapseSyg };
