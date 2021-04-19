import { MDCRipple } from '@material/ripple';
import { TSpinnerSyg } from './../spinner/component';

class TButtonSyg {
    private _startWidth: number = 0;
    private _spinnerSize: number = 28; // width + margin
    // private _autoInitSpinner: boolean = false;

    public ripple: MDCRipple;
    public root: HTMLElement;
    public spinner?: TSpinnerSyg | null = null;

    static attachTo(root: HTMLElement) {
        return new TButtonSyg(root);
    }

    constructor(root: HTMLElement) {
        this.ripple = new MDCRipple(root);
        this.root = root;
        const sp: HTMLElement | null = root.querySelector('.mdc-spinner');
        if (sp !== null) {
            this.spinner = new TSpinnerSyg(sp);
            this.root.addEventListener(
                'transitionend',
                (event: TransitionEvent) => {
                    if (event.propertyName === 'width' && this.spinner && !this.spinner.isShow()) {
                        this.root.style.justifyContent = '';
                    }
                }
            );
            // this.spinner.delayHidden = 3000;
            // this.root.addEventListener('click', () => {
            //     this._autoInitSpinner = true;
            // });
        }
    }

    /**
     * Button disabled or enabled
     */
    get disabled(): boolean {
        return this.root.hasAttribute('disabled');
    }

    set disabled(value: boolean) {
        if (this.disabled !== value) {
            if (value) {
                this.root.setAttribute('disabled', 'disabled');
            } else {
                this.root.removeAttribute('disabled');
            }
            if (this.spinner && this.spinnerIsAuto(this.spinner)) {
                this.spinnerToggle();
                // this._autoInitSpinner = value;
            }
        }
    }

    private static _spinnerStartTransition(th: TButtonSyg): void {
        if (th.spinner) {
            if (!th.spinner.isShow()) {
                const diffWidth = th._getDiffWidth();
                if (diffWidth > 0) {
                    th.root.style.justifyContent = 'normal';
                }
                th.root.style.width = `${th._startWidth + diffWidth}px`;
            } else {
                th.root.style.width = `${th._startWidth}px`;
            }
            th.spinner.toggle();
        }
    }

    private _getDiffWidth(): number {
        const label: HTMLElement | null = this.root.querySelector(
            '.mdc-button__label'
        );
        if (label) {
            const btnWidth: number = this.root.offsetWidth;
            const labelWidth: number = (label as HTMLElement).offsetWidth;
            const padding: number = parseInt(
                window
                    .getComputedStyle(this.root, null)
                    .getPropertyValue('padding-left'),
                0
            );
            if (btnWidth < 2 * padding + labelWidth + this._spinnerSize) {
                return 2 * padding + labelWidth + this._spinnerSize - btnWidth;
            }
        }
        return 0;
    }

    /**
     * @param {TSpinnerSyg} spinner
     */
    public spinnerIsAuto(spinner: TSpinnerSyg): boolean {
        return (
            // this._autoInitSpinner &&
            spinner && spinner.root.getAttribute('show') === 'auto'
        );
    }

    public spinnerToggle(): void {
        if (this.spinner) {
            // Стартовая инициализация width
            if (this._startWidth === 0) {
                // Из-за того, что width еще не инициализирован, следующий код необходимо запускать в другом процессе
                // В таом случае жабаскрипт инициализиурет style.width и запустит transition
                // Далее, чтобы лишний раз не эксплуатировать процессы, запускаем с инициализированным width
                this._startWidth = this.root.offsetWidth;
                this.root.style.width = `${this._startWidth}px`;
                setTimeout(() => {
                    TButtonSyg._spinnerStartTransition(this);
                }, 0);
            } else {
                TButtonSyg._spinnerStartTransition(this);
            }
        }
    }

    // public spinnerShow(show: boolean): void {

    // }
}

export { TButtonSyg };
