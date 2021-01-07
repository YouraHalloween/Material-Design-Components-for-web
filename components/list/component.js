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

MDCList.prototype._getValueListByIndex = function (fromValues) {

    const getVal = (index) => {
        if (fromValues[index] instanceof Element) {
            return fromValues[index].innerText;
        }
        return fromValues[index];
    };

    if (fromValues) {
        const selectedIndex = this.selectedIndex != -1 ? this.selectedIndex : this.foundation.focusedItemIndex;

        if (selectedIndex != -1) {
            if (typeof selectedIndex === 'number') {
                if (selectedIndex >= 0 && fromValues.length > selectedIndex) {
                    return getVal(selectedIndex);
                }
                return undefined;
            } else {
                const result = [];
                selectedIndex.forEach((index) => {
                    if (fromValues.length > index) {
                        result.push(getVal(index));
                    }
                });
                return result;
            }
        }
    }
    return undefined;
}

Object.defineProperty(MDCList.prototype, "values", {
    set: function (value) {
        this._values = value;
    },
    enumerable: true,
    configurable: true
});

/**
 * Свойство value
 * get - возвращает текущий value
 * set - делает item - selected
 */
Object.defineProperty(MDCList.prototype, "value", {
    get: function () {
        return this._getValueListByIndex(this._values);
    },
    set: function (value) {
        if (this.value !== value) {
            let itemIndex = -1;
            if (typeof value !== 'undefined') {
                if (typeof value === 'string') {
                    itemIndex = this.getIndexByValue(value);
                } else {
                    value.forEach((val) => {
                        const currentItemIndex = this.getIndexByValue(val);
                        if (currentItemIndex > -1) {
                            itemIndex.push(currentItemIndex);
                        }
                    });
                }
            }
            this.selectedIndex = itemIndex;
        }
    },
    enumerable: true,
    configurable: true
});

/**
 * Свойство value
 * get - возвращает текст выделенного меню
 */
Object.defineProperty(MDCList.prototype, "text", {
    get: function () {
        return this._getValueList(this.listElements);
    },
    enumerable: true,
    configurable: true
});

/**
 * Вернуть Item по value
 * @param {string} value 
 * @param {bool} enabled
 */
MDCList.prototype.setEnabledByValue = function (value, enabled = true) {
    var itemIndex = this.getIndexByValue(value);
    if (itemIndex > -1) {
        this.setEnabled(itemIndex, enabled);
    }
}

export { MDCList };