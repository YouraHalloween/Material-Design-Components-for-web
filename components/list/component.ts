import { MDCList } from '@material/list';
import { MDCListIndex } from '@material/list';

class MDCListSyg extends MDCList {
    private _values: string[] = [];

    constructor(root: Element, ...args: any[]) {
        super(root, ...args);
    }

    private _getValueList<ArrayValues>(fromValues: ArrayValues[]): string | string[] | undefined {
        const index: MDCListIndex = this.selectedIndex;
        if (typeof index === 'number') {
            if (index >= 0 && fromValues.length > index) {                
                return fromValues[index as number];
            }
            return undefined;
        } else {
            const result: string[] = [];
            index.forEach((value) => {
                if (fromValues.length > value) {
                    result.push(fromValues[value]);
                }
            });
            return result;
        }
    }

    /**
     * Вернуть индекс item по value
     * @param {string} value
     */
    getIndexByValue(value: string): number {
        let i: number = this.listElements.length;
        while (i--) {
            if (this._values[i] === value) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Свойство value
     * get - возвращает текущий value
     * set - делает item - selected
     */
    get value(): string | string[] | undefined {
        return this._getValueList(this._values);
    }

    set value(value: string | string[] | undefined) {
        if (this.value !== value) {
            let itemIndex: MDCListIndex = -1;
            if (typeof value !== 'undefined') {
                if (typeof value === 'string') {
                    itemIndex = this.getIndexByValue(value);
                } else {
                    value.forEach((val) => {
                        const currentItemIndex: number = this.getIndexByValue(
                            val
                        );
                        if (currentItemIndex > -1) {
                            (itemIndex as number[]).push(currentItemIndex);
                        }
                    });
                }
            }
            this.selectedIndex = itemIndex;
        }
    }

    /**
     * Property text
     * get - возвращает текст выделенного меню
     */
    get text(): string | string[] | undefined {
        return this._getValueList(this.listElements);

        const index: MDCListIndex = this.selectedIndex;
        if (typeof index === 'number') {
            if (index >= 0 && this._values.length > index) {
                return this._values[index as number];
            }
        }
        return undefined;

        if (index >= 0) {
            return this.listElements[index].innerText;
        }
        return undefined;
    }

    /**
     * Вернуть Item по value
     * @param {string} value
     * @param {bool} enabled
     */
    setEnabledByValue(value: string, enabled: boolean = true) {
        const itemIndex: number = this.getIndexByValue(value);
        if (itemIndex > -1) {
            this.setEnabled(itemIndex, enabled);
        }
    }
}

export { MDCListSyg };
