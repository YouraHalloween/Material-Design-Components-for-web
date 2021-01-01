import { MDCRipple } from '@material/ripple';
import { SpinnerSyg } from './../spinner/component';

const ButtonSyg = (function () {

    let _startWidth = 0;
    let _spinnerSize = 28;
    let _autoInitSpinner = false;

    ButtonSyg.attachTo = function (root) {
        return new ButtonSyg(root);
    };

    /**     
     * @param {SpinnerSyg} spinner
     */
    function spinnerIsAuto(spinner) {
        return _autoInitSpinner && spinner && spinner.root.getAttribute('aria-visible') == 'auto';
    }

    function ButtonSyg(root) {
        this.ripple = new MDCRipple(root);
        this.root = root;
        let _spinner = root.querySelector('.mdc-spinner');
        if (_spinner != null) {
            this.spinner = new SpinnerSyg(_spinner);
            this.spinner.durationHidden = 0;
            this.root.addEventListener('click', () => {
                _autoInitSpinner = true;
            });
        }
    }

    Object.defineProperty(ButtonSyg.prototype, "disabled", {
        get: function () {
            return this.root.hasAttribute('disabled');
        },
        set: function (value) {
            if (this.disabled != value) {
                if (value) {
                    this.root.setAttribute('disabled', true);
                } else {
                    this.root.removeAttribute('disabled');                    
                }
                if (spinnerIsAuto(this.spinner)) {
                    this.spinnerToggle();
                    _autoInitSpinner = value;
                }
            }
        },
        enumerable: true,
        configurable: true
    });

    function startTransition(th) {
        if (!th.spinner.isOpen()) {
            _startWidth = th.root.offsetWidth;
            th.root.style.width = `${_startWidth + _spinnerSize}px`;
        } else {
            th.root.style.width = `${_startWidth}px`;
        }
        th.spinner.toggle();
    }

    ButtonSyg.prototype.spinnerToggle = function () {
        //Стартовая инициализация width
        if (_startWidth == 0) {
            _startWidth = this.root.offsetWidth;
            this.root.style.width = `${_startWidth}px`;
            //Из-за того, что width еще не инициализирован, следующий код необходимо запускать в другом процессе
            //В таом случае жабаскрипт инициализиурет style.width и запустит transition
            //Далее, чтобы лишний раз не эксплуатировать процессы, запускаем с инициализированным width
            setTimeout(() => {
                startTransition(this);
            }, 0);
        } else {
            startTransition(this);
        }        
    }

    return ButtonSyg;
})();

export { ButtonSyg }