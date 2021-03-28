import { MDCList } from '@material/list/component';
declare class TCollapse extends MDCList {
    constructor(root: Element, ...args: any[]);
    private setClassByTimeout;
    isOpen(element: Element): boolean;
}
export { TCollapse };
