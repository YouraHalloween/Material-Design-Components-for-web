import { MDCRipple } from '@material/ripple';
import { TSpinnerSyg } from './../spinner/component';
declare class TButtonSyg {
    private _startWidth;
    private _spinnerSize;
    private _autoInitSpinner;
    ripple: MDCRipple;
    root: HTMLElement;
    spinner?: TSpinnerSyg | null;
    static attachTo(root: HTMLElement): TButtonSyg;
    constructor(root: HTMLElement);
    /**
     * Button disabled or enabled
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    private static _startTransition;
    /**
     * @param {TSpinnerSyg} spinner
     */
    spinnerIsAuto(spinner: TSpinnerSyg): boolean;
    spinnerToggle(): void;
}
export { TButtonSyg };
