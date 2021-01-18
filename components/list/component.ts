import { MDCList } from '@material/list/component';
import { MDCListIndex } from '@material/list';
import { TStringUnAr } from './../_types';

declare module '@material/list/component' {
    interface MDCList {
        // private
        _keys: string[];
        _getKeyList: <Keys>(fromKeys: Array<Keys>) => TStringUnAr;
        // public
        keys: string[];
        key: TStringUnAr;
        text: TStringUnAr;
        focusedItemIndex: number;
        setEnabledByValue: (key: string, enabled: boolean) => void;
        setIndex: (index: number) => void;
    }
}

MDCList.prototype._getKeyList = function <Keys>(
    fromKeys: Array<Keys>
): TStringUnAr {
    const getVal = (index: number): string => {
        if (fromKeys[index] instanceof Element) {
            return ((fromKeys[index] as unknown) as HTMLElement).innerText;
        }
        return (fromKeys[index] as unknown) as string;
    };

    const selectedIndex: MDCListIndex =
        this.selectedIndex != -1 ? this.selectedIndex : this.focusedItemIndex;

    if (selectedIndex != -1) {
        if (typeof selectedIndex === 'number') {
            if (selectedIndex >= 0 && fromKeys.length > selectedIndex) {
                return getVal(selectedIndex as number);
            }
            return undefined;
        } else {
            const result: string[] = [];
            selectedIndex.forEach((index) => {
                if (fromKeys.length > index) {
                    result.push(getVal(index));
                }
            });
            return result;
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

Object.defineProperty(MDCList.prototype, 'keys', {
    set(value: string[]) {
        return (this._keys = value);
    },
    enumerable: true,
    configurable: true,
});

/**
 * Свойство key
 * get - возвращает текущий key
 * set - делает item - selected
 */
Object.defineProperty(MDCList.prototype, 'key', {
    get(): TStringUnAr {
        return this._getKeyList(this._keys);
    },
    set(value: TStringUnAr) {
        if (this.key !== value) {
            let itemIndex: number[] = [];
            if (this._keys && typeof value !== 'undefined') {
                if (Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        for (let j = 0; j < this._keys.length; j++) {
                            if (value[i] === this._keys[j]) {
                                itemIndex.push(j);
                                break;
                            }
                        }
                    }
                } else {
                    const index: number = this._keys.indexOf(value);
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
        return this._getKeyList(this.listElements);
    },
    enumerable: true,
    configurable: true,
});

/**
 * @param {string} key
 * @param {bool} enabled
 */
MDCList.prototype.setEnabledByValue = function (
    key: string,
    enabled: boolean = true
): void {
    const itemIndex: number = this._keys.indexOf(key);
    if (itemIndex > -1) {
        this.setEnabled(itemIndex, enabled);
    }
};

export { MDCList };
