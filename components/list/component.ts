import { MDCList } from '@material/list/component';
import { MDCListIndex } from '@material/list';
import { TStringUnAr } from './../_types';

declare module '@material/list/component' {
    interface MDCList {
        // private
        _values: string[];
        _getValueList: <Values>(fromValues: Values[]) => TStringUnAr;
        // public
        values: string[];
        value: TStringUnAr;
        text: TStringUnAr;
        focusedItemIndex: number;
        setEnabledByValue: (value: string, enabled: boolean) => void;
        setIndex: (index: number) => void;
    }
}

MDCList.prototype._getValueList = function <Values>(
    fromValues: Values[]
): TStringUnAr {
    const getVal = (index: number): string => {
        if (fromValues[index] instanceof Element) {
            return ((fromValues[index] as unknown) as HTMLElement).innerText;
        }
        return (fromValues[index] as unknown) as string;
    };
    if (fromValues) {
        const selectedIndex: MDCListIndex =
            this.selectedIndex !== -1
                ? this.selectedIndex
                : this.focusedItemIndex;

        if (selectedIndex !== -1) {
            if (typeof selectedIndex === 'number') {
                if (selectedIndex >= 0 && fromValues.length > selectedIndex) {
                    return getVal(selectedIndex as number);
                }
                return undefined;
            } else {
                const result: string[] = [];
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
};

Object.defineProperty(MDCList.prototype, 'focusedItemIndex', {
    get(): number {
        return this.foundation.focusedItemIndex;
    },
    enumerable: true,
    configurable: true,
});

Object.defineProperty(MDCList.prototype, 'values', {
    set(value: string[]) {
        this._values = value;
    },
    enumerable: true,
    configurable: true,
});

/**
 * Свойство value
 * get - возвращает текущий value
 * set - делает item - selected
 */
Object.defineProperty(MDCList.prototype, 'value', {
    get(): TStringUnAr {
        return this._getValueList(this._values);
    },
    set(value: TStringUnAr) {
        if (this.value && this.value !== value) {
            let itemIndex: number[] = [];
            if (this._values && typeof value !== 'undefined') {
                if (Array.isArray(value)) {
                    // tslint:disable-next-line: prefer-for-of
                    for (let i = 0; i < value.length; i++) {
                        for (let j = 0; j < this._values.length; j++) {
                            if (value[i] === this._values[j]) {
                                itemIndex.push(j);
                                break;
                            }
                        }
                    }
                } else {
                    const index: number = this._values.indexOf(value);
                    if (index > -1) {
                        itemIndex = [index];
                    }
                }
            }
            this.selectedIndex = itemIndex;
        }
    },
    enumerable: true,
    configurable: true,
});

/**
 * Property text
 * get - возвращает текст выделенного меню
 */
Object.defineProperty(MDCList.prototype, 'text', {
    get(): TStringUnAr {
        return this._getValueList(this.listElements);
    },
    enumerable: true,
    configurable: true,
});

/**
 * @param {string} value
 * @param {bool} enabled
 */
MDCList.prototype.setEnabledByValue = function (
    value: string,
    enabled: boolean = true
): void {
    const itemIndex: number = this._values.indexOf(value);
    if (itemIndex > -1) {
        this.setEnabled(itemIndex, enabled);
    }
};

export { MDCList };
