import { MDCSnackbar } from './crutch';

class MDCSnackbarSyg extends MDCSnackbar {
    private _message: string[];

    constructor(root: Element, ...args: any[]) {
        super(root, ...args);
        this._message = [];
    }

    /**
     * Устанавливает классы для контейнера
     * @param {string} cls
     * @param {boolean} prop
     * @param {boolean} value
     */
    private _setClassProperty(
        cls: string,
        prop: boolean,
        value: boolean
    ): void {
        if (value && !prop) {
            this.root.classList.add(cls);
        } else if (!value && prop) {
            this.root.classList.remove(cls);
        }
    }

    /**
     * stacked - кнопки будут на отдельной строке
     * @param {boolean} value
     */
    get stacked(): boolean {
        return this.root.classList.contains('mdc-snackbar--stacked');
    }
    set stacked(value: boolean) {
        this._setClassProperty('mdc-snackbar--stacked', this.stacked, value);
        this.actionBaseline = !value;
    }

    /**
     * actionBaseline - отделяет кнопки от контейнера с сообещниями с права
     * @param {boolean} value
     */
    get actionBaseline(): boolean {
        return this.root.classList.contains('mdc-snackbar--action-baseline');
    }
    set actionBaseline(value: boolean) {
        this._setClassProperty(
            'mdc-snackbar--action-baseline',
            this.actionBaseline,
            value
        );
    }

    /**
     * Позиция контейнера в начале экрана
     * @param {bool} value
     */
    get leading() {
        return this.root.classList.contains('mdc-snackbar--leading');
    }
    set leading(value) {
        this._setClassProperty('mdc-snackbar--leading', this.leading, value);
    }

    /**
     * Позиция контейнера в конце экрана
     * @param {bool} value
     */
    get trailing() {
        return this.root.classList.contains('mdc-snackbar--trailing');
    }
    set trailing(value) {
        this._setClassProperty('mdc-snackbar--trailing', this.trailing, value);
    }

    // get buttonText() {
    //     return this.actionButtonText;
    // }
    // set buttonText(value) {
    //     var button = $(_snackbar.actionEl_);
    //     if (button.css('display') == 'none' && value.trim() != '') {
    //         button.css('display', 'inline-block');
    //     } else if (button.css('display') !== 'none' && value.trim() == '') {
    //         button.css('display', 'none');
    //     }
    //     this.actionButtonText = value;
    // }

    get hasButtonClose(): boolean {
        let el: HTMLCollectionOf<Element> = this.surfaceEl.getElementsByClassName(
            'mdc-snackbar__dismiss'
        );
        let display: string = (el[0] as HTMLElement).style.display;
        return display.length == 0 || display === 'block';
    }
    set hasButtonClose(value: boolean) {
        if (this.hasButtonClose !== value) {
            let prop: string = value === true ? 'block' : 'none';
            let el: HTMLCollectionOf<Element> = this.surfaceEl.getElementsByClassName(
                'mdc-snackbar__dismiss'
            );
            (el[0] as HTMLElement).style.display = prop;
        }
    }

    /**
     * @param {string} value
     */
    minWidth(value: string): void {
        this.surfaceEl.style.minWidth = value;
    }

    /**
     * @param {string} value
     */
    maxWidth(value: string): void {
        this.surfaceEl.style.maxWidth = value;
    }
    /**
     * Устанавливает жесткие размеры для контейнера
     * @param {string} value
     */
    size(value: string) {
        this.minWidth(value);
        this.maxWidth(value);
    }

    /**
     * Добавит сообщение в <div>message1</div>
     * Чтобы отчситить массив message, нужно открыть Snackbar
     * @param {string} message
     */
    add(message: string) {
        this._message.push(message);
    }

    /**
     * Click button
     * @param { EventListener } fn
     */
    buttonClick(fn: EventListener): void {
        this.foundation.handleActionButtonClick = fn;
    }

    // /**
    //  * Событие по кнопке Закрыть
    //  * @param { EventListener } fn
    //  */
    // closeClick(fn: EventListener) {
    //     var fnClose = () => {
    //         fn();
    //         this.close();
    //     };
    //     this.foundation.handleActionIconClick = fnClose;
    // }

    /**
     * Добавить в сообщение html code
     * @param { string } text
     */
    showMessage(label: string = '') {
        if (this._message.length > 0) {
            var htmltext = this._message
                .map((item) => {
                    return '<div>' + item + '</div>';
                })
                .join('');
            this.labelEl.innerHTML = htmltext;
            this._message = [];
        } else if (label.trim() !== '') {
            this.labelText = label;
        }
        this.open();
    }
}

export { MDCSnackbarSyg };
