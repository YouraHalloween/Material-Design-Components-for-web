import { MDCList } from '@material/list/component';
import { MDCDrawerSyg } from '../drawer/component';
declare class TLeftAppBarSyg extends MDCList {
    static attachTo(root: Element): TLeftAppBarSyg;
    constructor(root: Element, ...args: any[]);
    isAll(index?: number): boolean;
    attachDrawer(drawer: MDCDrawerSyg): void;
}
export { TLeftAppBarSyg };
