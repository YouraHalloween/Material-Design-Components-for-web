import { MDCList } from './mdc-list-collapse';
declare class TCollapseSyg extends MDCList {
    private icons;
    static attachTo(root: HTMLElement): TCollapseSyg;
    constructor(root: Element, ...args: any[]);
    expand(index: number): void;
    private setClassByTimeout;
    layout(): void;
    isOpen(element: Element): boolean;
}
export { TCollapseSyg };
