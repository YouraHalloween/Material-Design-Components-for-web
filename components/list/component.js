
import { MDCList } from '@material/list';

/**
 * Вернуть индекс item по value
 * @param {string} value 
 */
MDCList.prototype.getIndexByValue = function (value) {
    var i = this.listElements.length;

    while (i--) {
        if (this.listElements[i].getAttribute('value') === value) {
            return i;
        }
    }
    return -1;
}
/**
 * Свойство key
 * get - возвращает текущий key
 * set - делает item - selected
 */
Object.defineProperty(MDCList.prototype, "value", {
    get: function () {
        var index = this.foundation.focusedItemIndex >= 0 ?
            this.foundation.focusedItemIndex : this.selectedIndex;
        if ( index >= 0) {
            return this.listElements[index].getAttribute('value');
        }
        return undefined;
    },
    set: function (value) {
        if (this.value != value) {
            var itemIndex = this.getIndexByValue(value);
            if (itemIndex > -1) {
                this.selectedIndex = itemIndex;
            }            
        }
    },
    enumerable: true,
    configurable: true
});

/**
 * Свойство value
 * get - возвращает текст выделенного меню
 */
Object.defineProperty(MDCList.prototype, "value", {
    get: function () {
        var index = this.foundation.focusedItemIndex >= 0 ?
            this.foundation.focusedItemIndex : this.selectedIndex;
        if (index >= 0) {
            return this.listElements[index].innerText;
        }
        return undefined;
    },
    enumerable: true,
    configurable: true
});

/**
 * Вернуть Item по value
 * @param {string} value 
 * @param {bool} enabled
 */
MDCList.prototype.setEnabledByValue = function(value, enabled = true) {
    var itemIndex = this.getIndexByValue(value);
    if (itemIndex > -1) {
        this.setEnabled(itemIndex, enabled);
    } 
}

export { MDCList };