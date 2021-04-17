import { MDCList } from '@material/list/component';
interface INameMap {
    [className: string]: string;
}
declare module '@material/list/component' {
    interface MDCList {
        classNameMapForce: INameMap;
    }
}
export { MDCList };
