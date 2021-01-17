import { MDCMenu } from '@material/menu/component';
import { MDCList } from './../list/component';
import { TStringUnAr } from './../_types';

declare module '@material/menu/component' {
    interface MDCMenu {
        list: MDCList;
        key: TStringUnAr;
        text: TStringUnAr;
        setEnabledByValue: (key: string, enabled: boolean) => void;
    }
}

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
 * Свойство key
 * get - возвращает текущий key
 * set - делает item - selected
 */
Object.defineProperty(MDCMenu.prototype, 'key', {
    get: function (): TStringUnAr {
        return this.list.key;
    },
    set: function (value: TStringUnAr) {
        this.list.key = value;
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
 * @param {string} key
 * @param {boolean} enabled
 */
MDCMenu.prototype.setEnabledByValue = function (
    key: string,
    enabled: boolean = true
): void {
    this.list.setEnabledByValue(key, enabled);
};

export { MDCMenu };
