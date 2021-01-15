import { CustomValidity } from './CustomValidity.js';
/**
 * HELPER MESSAGE
 */
const HelperMessage = (function () {
    /**
    * @param {MDCTextField} textField
    * @param {bool} initCustomError - создает события от браузера
    */
    function HelperMessage(textField, initCustomError = false) {
        this.textField = textField;
        this._info = this.textField.helperText_.root.innerText;
        this._error = undefined;
        //Используется внутри компонента для сравнения     
        this._bufferCurrentMessage = undefined;
        this._customError = undefined;

        if (initCustomError) {
            this.createCustomError()
        }

        /**
         * Выводить сообщения при событии Blur
         * Если используется браузерная валидация textField.useNativeValidation = true
         * Если textField.useNativeValidation = false, компонентом управляется в ручную с использованием
         * valid = true | false, HelperMessage.error, HelperMessage.info
         */
        this._listenerBlur = () => { this.render() }
        this.validateOnBlur = this.textField.useNativeValidation;
    }

    /**     
     * @param {String} text 
     */
    HelperMessage.prototype._compare = function (text) {
        return text === this._bufferCurrentMessage;
    }

    Object.defineProperty(HelperMessage.prototype, "info", {
        get: function () {
            return this._info;
        },
        set: function (value) {
            if (this._info !== value) {
                this._info = value;
                this.render();
            }
        },
        enumerable: true,
        configurable: true
    })

    Object.defineProperty(HelperMessage.prototype, "error", {
        get: function () {
            return this._error;
        },
        set: function (value) {
            if (this._error !== value) {
                this._error = value;
            }
        },
        enumerable: true,
        configurable: true
    })

    Object.defineProperty(HelperMessage.prototype, "customError", {
        get: function () {
            return this.createCustomError();
        },
        set: function (value) {
            if (this._customError != value) {
                this._customError = value;
            }
        },
        enumerable: true,
        configurable: true
    })

    /**
     * Вернуть текущий мессадж
     * Проверка на Valid, после пытаемся найти сообщение об ошибке
     * Если сообщение об ошибке не найдено, выводим какой нибудь Info
     * Если не найдено выводим пусто
     */
    Object.defineProperty(HelperMessage.prototype, "message", {
        get: function () {
            var text = '';
            /**
            * Если документ еще не готов, то не нужно выводить ошибку
            */
            if (!this.valid && document.readyState == 'complete') {
                if (this._error) {
                    text = this._error
                }
                else if (this._customError) {
                    text = this._customError.current();
                }
            }
            if ((this.valid || text === '') && this._info) {
                text = this._info;
            }
            return text;
        },

        enumerable: true,
        configurable: true
    })

    Object.defineProperty(HelperMessage.prototype, "valid", {
        get: function () {
            return this.textField.valid;
        },
        enumerable: true,
        configurable: true
    })

    /**
     * Следим за изменением кпомпонента
     * Создается в конструкторе компонента, если изначально заданы условия валидации
     * Если не заданы, но необходимо отслеживать изменения, то необходимо вызвать принудительно процедуру
     */
    Object.defineProperty(HelperMessage.prototype, "validateOnBlur", {
        get: function () {
            return this._validateOnBlur;
        },
        set: function (value) {
            if (this._validateOnBlur != value) {
                this._validateOnBlur = value;
                if (value) {
                    this.textField.input_.addEventListener('blur', this._listenerBlur);
                } else {
                    this.textField.input_.removeEventListener('blur', this._listenerBlur);
                }
            }
        },
        enumerable: true,
        configurable: true
    })

    HelperMessage.prototype.createCustomError = function () {
        if (!this._customError)
            this._customError = new CustomValidity(this.textField.input_);
        return this._customError;
    }

    /**
     * 
     * @param {String} text 
     */
    HelperMessage.prototype.render = function (text) {
        if (!text) {
            text = this.message;
        }
        if (!this._compare(text)) {
            this._bufferCurrentMessage = text;
            this.textField.helperTextContent = text;
        }
    }

    return HelperMessage;
})();

export { HelperMessage };