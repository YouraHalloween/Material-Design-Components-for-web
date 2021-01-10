/**
 * CustomValidity
 
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
 * CustomError создается:
 * - из атрибута custom-error
 * - функцией createCustomError
 * - при обращении к свойству this.helperMessage.customError;
 * CustomError использует ошибки браузера при валидации и выводит их
 */
import { TUnString } from './../../_types';

type TMessage<T> = {
    -readonly [K in keyof T]?: string;
};

type TMessageValidity = TMessage<ValidityState>;

type TPropertyValidityState = keyof ValidityState;

class CustomValidity {
    /**
     * this._message имеет такую структуру
     * {
        customError: '',
        badInput: '',
        stepMismatch: '',
        rangeOverflow: '',
        rangeUnderFlow: '',
        tooLong: '',
        tooShort: '',
        patternMismatch: '',
        typeMismatch: '',
        valueMissing: ''
    };*/

    public input: HTMLInputElement;
    private _message: TMessageValidity;

    constructor(input: HTMLInputElement) {
        this.input = input;
        this._message = {};
    }

    _getPropertyValid(): TPropertyValidityState | boolean {
        let item: TPropertyValidityState;

        for (item in this.input.validity) {
            if (this.input.validity[item]) {
                return item;
            }
        }
        return false;
    }

    get message(): TMessageValidity {
        return this._message;
    }
    set message(value: TMessageValidity) {
        this._message = value;
    }

    isValid(): boolean {
        return this.input.validity.valid;
    }

    /**
     * Вернуть либо кастомный месадж, либо из свойства validationMessage
     */
    current(): TUnString {
        if (this.isValid()) {
            return '';
        }

        let result: TUnString;
        if (this._message) {
            let prop = this._getPropertyValid();
            if (prop) {
                result = this._message[<TPropertyValidityState>prop];
            }
        }
        if (!result) {
            result = this.input.validationMessage;
        }
        return result;
    }
}

export { CustomValidity };
