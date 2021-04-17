import { MDCList } from '@material/list/component';

interface INameMap {
    [className: string]: string;
}

declare module '@material/list/component' {
    interface MDCList {
        // public
        classNameMapForce: INameMap;
    }
}

Object.defineProperty(MDCList.prototype, 'classNameMapForce', {
    get(): INameMap {
        return this.classNameMap;
    },
    set(value: INameMap) {
        this.classNameMap = value;
    },
    enumerable: true,
    configurable: true,
});

export { MDCList };
