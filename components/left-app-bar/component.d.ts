declare type TEventClickFn = (index: string, event: Event) => {};
declare class TLeftAppBarSyg {
    private _eventlick?;
    root: Element;
    static attachTo(root: Element): TLeftAppBarSyg;
    constructor(root: Element);
    listen(fn: TEventClickFn): void;
}
export { TLeftAppBarSyg };
