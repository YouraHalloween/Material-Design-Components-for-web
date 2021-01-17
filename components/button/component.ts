import { MDCRipple } from '@material/ripple';
import { TSpinnerSyg } from './../spinner/component';

class TButtonSyg {
    private _startWidth: number = 0;
    private _spinnerSize: number = 28;
    private _autoInitSpinner: boolean = false;

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
            this.spinner.delayHidden = 0;
            this.root.addEventListener('click', () => {
                this._autoInitSpinner = true;
            });
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
                this._autoInitSpinner = value;
            }
        }
    }

    private static _startTransition(th: TButtonSyg): void {
        if (th.spinner) {
            if (!th.spinner.isOpen()) {
                th._startWidth = th.root.offsetWidth;
                th.root.style.width = `${th._startWidth + th._spinnerSize}px`;
            } else {
                th.root.style.width = `${th._startWidth}px`;
            }
            th.spinner.toggle();
        }
    }

    /**
     * @param {TSpinnerSyg} spinner
     */
    public spinnerIsAuto(spinner: TSpinnerSyg): boolean {
        return (
            this._autoInitSpinner &&
            spinner &&
            spinner.root.getAttribute('aria-visible') === 'auto'
        );
    }

    public spinnerToggle(): void {
        if (this.spinner) {
            // Стартовая инициализация width
            if (this._startWidth === 0) {
                this._startWidth = this.root.offsetWidth;
                this.root.style.width = `${this._startWidth}px`;
                // Из-за того, что width еще не инициализирован, следующий код необходимо запускать в другом процессе
                // В таом случае жабаскрипт инициализиурет style.width и запустит transition
                // Далее, чтобы лишний раз не эксплуатировать процессы, запускаем с инициализированным width
                setTimeout(() => {
                    TButtonSyg._startTransition(this);
                }, 0);
            } else {
                TButtonSyg._startTransition(this);
            }
        }
    }
}

export { TButtonSyg };
