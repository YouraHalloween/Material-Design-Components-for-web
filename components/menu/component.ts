import { MDCMenu } from '@material/menu/component';
import { MDCList } from './../list/component';
import { TStringUnAr } from './../_types';

declare module '@material/menu/component' {
    interface MDCMenu {
        list: MDCList;
        value: TStringUnAr;
        values: string[],
        text: TStringUnAr;
        setEnabledByValue: (value: string, enabled: boolean) => void;
    }
}

Object.defineProperty(MDCMenu.prototype, 'values', {
    set(value: string[]) {
        return (this.list.values = value);
    },
    enumerable: true,
    configurable: true,
});

/**
 * Public property List
 */
Object.defineProperty(MDCMenu.prototype, "list", {
    get: function (): MDCList {
        return this.list_;
    },
    enumerable: true,
    configurable: true
});

/**
 * Свойство value
 * get - возвращает текущий value
 * set - делает item - selected
 */
Object.defineProperty(MDCMenu.prototype, 'value', {
    get: function (): TStringUnAr {
        return this.list.value;
    },
    set: function (value: TStringUnAr) {
        this.list.value = value;
    },
    enumerable: true,
    configurable: true,
});

Object.defineProperty(MDCMenu.prototype, 'text', {
    get: function (): TStringUnAr {
        return this.list.text;
    },
    enumerable: true,
    configurable: true,
});

/**
 * @param {string} value
 * @param {boolean} enabled
 */
MDCMenu.prototype.setEnabledByValue = function (
    value: string,
    enabled: boolean = true
): void {
    this.list.setEnabledByValue(value, enabled);
};

export { MDCMenu };
