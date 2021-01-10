import { CustomValidity } from './CustomValidity';
import { MDCTextField } from '@material/textfield';
import { TUnString, Types } from './../../_types';

class HelperMessage {
    private _info?: string;
    private _error?: string;
    private _customError?: CustomValidity;
    private _bufferCurrentMessage?: string;
    private _handleEventBlur: EventListener;
    private _validateOnBlur: boolean = false;

    public textField: MDCTextField;

    /**
     * @param {MDCTextField} textField
     * @param {boolean} initCustomError - создает события от браузера
     */
    constructor(textField: MDCTextField, initCustomError: boolean = false) {
        this.textField = textField;
        this._info = this.textField.helperText.root.innerText;

        if (initCustomError) {
            this.createCustomError();
        }

        /**
         * Выводить сообщения при событии Blur
         * Если используется браузерная валидация textField.useNativeValidation = true
         * Если textField.useNativeValidation = false, компонентом управляется в ручную с использованием
         * valid = true | false, HelperMessage.error, HelperMessage.info
         */
        this._handleEventBlur = () => {
            this.render();
        };
        this.validateOnBlur = this.textField.useNativeValidation;
    }

    get info(): TUnString {
        return this._info;
    }
    set info(value: TUnString) {
        if (this._info !== value) {
            this._info = value;
            this.render();
        }
    }

    get error(): TUnString {
        return this._error;
    }
    set error(value: TUnString) {
        if (this._error !== value) {
            this._error = value;
            /**
             * Если документ еще не готов, то не нужно выводить ошибку
             */
            if (document.readyState == <DocumentReadyState>'complete') {
                this.render();
            }
        }
    }

    get customError(): CustomValidity {
        return this.createCustomError();
    }
    set customError(value: CustomValidity) {
        if (this._customError != value) {
            this._customError = value;
        }
    }

    /**
     * Вернуть текущий мессадж
     * Проверка на Valid, после пытаемся найти сообщение об ошибке
     * Если сообщение об ошибке не найдено, выводим какой нибудь Info
     * Если не найдено выводим пусто
     */
    get message(): TUnString {
        let text: TUnString = '';
        if (!this.valid) {
            if (this._error) {
                text = this._error;
            } else if (this._customError) {
                text = this._customError.current();
            }
        }
        if ((this.valid || text === '') && this._info) {
            text = this._info;
        }
        return text;
    }

    get valid(): boolean {
        return this.textField.valid;
    }
    /**
     * Следим за изменением кпомпонента
     * Создается в конструкторе компонента, если изначально заданы условия валидации
     * Если не заданы, но необходимо отслеживать изменения, то необходимо вызвать принудительно процедуру
     */
    get validateOnBlur() {
        return this._validateOnBlur;
    }
    set validateOnBlur(value: boolean) {
        if (this._validateOnBlur !== value) {
            this._validateOnBlur = value;
            if (value) {
                this.textField.input.addEventListener(
                    'blur',
                    this._handleEventBlur
                );
            } else {
                this.textField.input.removeEventListener(
                    'blur',
                    this._handleEventBlur
                );
            }
        }
    }

    createCustomError() {
        if (!this._customError) {
            this._customError = new CustomValidity(this.textField.input);
        }
        return this._customError;
    }

    /**
     * @param {String} text
     */
    render(text?: TUnString): void {
        if (!text) {
            text = this.message;
        }
        if (text !== this._bufferCurrentMessage) {
            this._bufferCurrentMessage = text;
            this.textField.helperTextContent = Types.defValue(text, '');
        }
    }
}

export { HelperMessage };
