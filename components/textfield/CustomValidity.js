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
const CustomValidity = (function () {
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

    function CustomValidity(input) {
        this._input = input;        
        this._message = {};
    }

    CustomValidity.prototype._getPropertyValid = function () {
        for (var item in this._input.validity) {
            if (item !== 'value' && this._input.validity[item]) {
                return item;
            }
        }
        return false;
    }

    Object.defineProperty(CustomValidity.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            this._message = value;
        },
        enumerable: true,
        configurable: true
    })

    /**
     * Если свойст у инпута не существует, то создать самостоятельно
     */
    CustomValidity.prototype.createDefault = function () {
        this._input.validationMessage = '';
        this._input.validity = {
            badInput: false,
            customError: false,
            patternMismatch: false,
            rangeOverflow: false,
            rangeUnderflow: false,
            stepMismatch: false,
            tooLong: false,
            tooShort: false,
            typeMismatch: false,
            valid: true,
            valueMissing: false,
        }
    }

    CustomValidity.prototype.isValid = function () {
        return this._input.validity.valid;
    }

    /**
     * Вернуть либо кастомный месадж, либо из свойства validationMessage
     */
    CustomValidity.prototype.current = function () {
        if (this.isValid()) {
            return '';
        }

        var result = undefined;
        if (this._message) {
            var prop = this._getPropertyValid();
            result = this._message[prop];
        }
        if (!result) {
            result = this._input.validationMessage
        }
        return result;
    }

    return CustomValidity;
})();

export { CustomValidity };