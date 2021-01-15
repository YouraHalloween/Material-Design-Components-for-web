
import { MDCTextFieldSyg } from './../component';
import { TUnString, Types } from './../../_types';

/*
valid – возвращает true, если поле без ошибок и false в противном случае;
valueMissing – возвращает true, если значение в поле отсутствует, но оно требуется;
typeMismatch – возвращает true, если значение не соответствует синтаксису, к примеру, не корректно введен адрес электронной почты;
patternMismatch – возвращает true, если значение не соответствует выражению в атрибуте pattern;
tooLong – возвращает true, если значение превышает допустимую длину maxlength;.
tooShort – возвращает true, если значение меньше допустимого минимума minlength;.
rangeUnderFlow – возвращает true, если значение меньше допустимого min;
rangeOverflow – возвращает true, если значение больше допустимого max;
stepMismatch – возвращает true, если значение введено с недопустимым шагом step;
badInput – возвращает true, если запись не может быть преобразована в значение;
customError – возвращает true, если поле имеет набор ошибок пользователя.
*/

/**
 * this._message имеет такую структуру
 * {
 * customError: '',
 * badInput: '',
 * stepMismatch: '',
 * rangeOverflow: '',
 * rangeUnderFlow: '',
 * tooLong: '',
 * tooShort: '',
 * patternMismatch: '',
 * typeMismatch: '',
 * valueMissing: ''
 * };
 */

type TMessage<T> = {
    -readonly [K in keyof T]?: string;
};

type TMessageValidity = TMessage<ValidityState>;

type TPropertyValidityState = keyof ValidityState;

class HelperMessage {
    private _info?: string;
    private _error?: string;
    private _ex: TMessageValidity = {};
    private _bufferCurrentMessage?: string;
    private _handleEventBlur: EventListener;
    private _validateOnBlur: boolean = false;

    public textField: MDCTextFieldSyg;
    public useNativeMessage: boolean = false;

    /**
     * @param {MDCTextFieldSyg} textField
     */
    constructor(textField: MDCTextFieldSyg) {
        this.textField = textField;
        this._info = (this.textField.helperText.root as HTMLElement).innerText;

        /**
         * Выводить сообщения при событии Blur
         */
        this._handleEventBlur = () => {
            this.render();
        };
        this.validateOnBlur = true;
    }

    private _getPropertyValid(): TPropertyValidityState | boolean {
        let item: TPropertyValidityState;

        for (item in this.textField.input.validity) {
            if (item !== 'valid' && this.textField.input.validity[item]) {
                return item;
            }
        }

        return false;
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
            this.render();
        }
    }

    get ex(): TMessageValidity {
        return this._ex;
    }
    set ex(value: TMessageValidity) {
        if (this._ex !== value) {
            this._ex = value;
            this.render();
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
        /**
         * Если документ еще не готов, то не нужно выводить ошибку
         */
        if (!this.valid && document.readyState === 'complete') {
            if (this._error) {
                text = this._error;
            } else if (this._ex && this.useNativeMessage) {
                text = this.exMessage();
            }
        }
        if ((this.valid || text === '') && this._info) {
            text = this._info;
        }
        return text;
    }

    /**
     * Вернуть либо расширенный месадж, либо из свойства validationMessage
     */
    exMessage(): TUnString {
        if (this.valid) {
            return '';
        }

        let result: TUnString;
        if (this._ex) {
            const prop = this._getPropertyValid();
            if (prop) {
                result = this._ex[prop as TPropertyValidityState];
            }
        }
        if (!result) {
            result = this.textField.input.validationMessage;
        }
        return result;
    }

    get valid(): boolean {
        return this.textField.valid;
    }
    /**
     * Следим за изменением кпомпонента
     * Создается в конструкторе компонента, если изначально заданы условия валидации
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
