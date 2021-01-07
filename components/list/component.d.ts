import { MDCList } from '@material/list';
declare class MDCListSyg extends MDCList {
    private _values;
    constructor(root: Element, ...args: any[]);
    private _getValueList;
    /**
     * Вернуть индекс item по value
     * @param {string} value
     */
    getIndexByValue(value: string): number;
    /**
     * Свойство value
     * get - возвращает текущий value
     * set - делает item - selected
     */
    get value(): string | string[] | undefined;
    set value(value: string | string[] | undefined);
    /**
     * Property text
     * get - возвращает текст выделенного меню
     */
    get text(): string | string[] | undefined;
    /**
     * Вернуть Item по value
     * @param {string} value
     * @param {bool} enabled
     */
    setEnabledByValue(value: string, enabled?: boolean): void;
}
export { MDCListSyg };
