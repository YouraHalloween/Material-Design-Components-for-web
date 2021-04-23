import { MDCRipple } from '@material/ripple';
import { TSpinnerSyg } from './../spinner/component';
declare class TButtonSyg {
    private _startWidth;
    private _spinnerSize;
    ripple: MDCRipple;
    root: HTMLElement;
    spinner?: TSpinnerSyg | null;
    icon: HTMLElement | null;
    static attachTo(root: HTMLElement): TButtonSyg;
    constructor(root: HTMLElement);
    /**
     * Button disabled or enabled
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    private static _spinnerStartTransition;
    private _getDiffWidth;
    /**
     * @param {TSpinnerSyg} spinner
     */
    spinnerIsAuto(spinner: TSpinnerSyg): boolean;
    spinnerToggle(): void;
}
export { TButtonSyg };
