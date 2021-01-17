import { MDCList } from '@material/list';

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
            let itemIndex = [];
            if (this._values && typeof value !== 'undefined') {
                if (typeof value === 'object') {
                    for (let i = 0; i < value.length; i++) {
                        for (let j = 0; j < this._values.length; j++) {
                            if (value[i] === this._values[j]) {
                                itemIndex.push(j);
                                break;
                            }                            
                        }                        
                    }                    
                } else {
                    itemIndex = this._values.indexOf(value);
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
    const itemIndex = this._values.indexOf(value);
    if (itemIndex > -1) {
        this.setEnabled(itemIndex, enabled);
    }
}

export { MDCList };