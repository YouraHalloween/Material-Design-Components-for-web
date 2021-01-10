import { MDCMenu } from '@material/menu';
import { MDCList } from '@material/list';

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
    get: function (): string | string[] | undefined {
        return this.list.value;
    },
    set: function (value: string | string[] | undefined) {
        this.list.value = value;
    },
    enumerable: true,
    configurable: true,
});

Object.defineProperty(MDCMenu.prototype, 'text', {
    get: function (): string | string[] | undefined {
        return this.list.text;
    },
    enumerable: true,
    configurable: true,
});

/**
 * Вернуть Item по value
 * @param {string} value
 * @param {bool} enabled
 */
// MDCMenu.prototype.setEnabledByValue = function (value: string | number, enabled: boolean = true): void {
//     this.list.setEnabledByValue(value, enabled);
// };

export { MDCMenu };
