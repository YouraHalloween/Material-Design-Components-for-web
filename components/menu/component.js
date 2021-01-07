import { MDCMenu } from '@material/menu';

Object.defineProperty(MDCMenu.prototype, "values", {
    set: function (value) {
        this.list_._values = value;
    },
    enumerable: true,
    configurable: true
});

/**
 * Свойство value
 * get - возвращает текущий value
 * set - делает item - selected
 */
Object.defineProperty(MDCMenu.prototype, "value", {
    get: function () {
        return this.list_.value;
    },
    set: function (value) {
        this.list_.value = value;
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(MDCMenu.prototype, "text", {
    get: function () {
        return this.list_.text;
    },
    enumerable: true,
    configurable: true
});

/**
 * Вернуть Item по value
 * @param {string} value 
 * @param {bool} enabled
 */
MDCMenu.prototype.setEnabledByValue = function (value, enabled = true) {
    this.list_.setEnabledByValue(value, enabled);
}

export { MDCMenu };