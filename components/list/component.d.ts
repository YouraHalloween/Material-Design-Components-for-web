import { MDCList } from '@material/list/component';
import { TStringUnAr } from './../_types';
declare module '@material/list/component' {
    interface MDCList {
        _keys: string[];
        _getKeyList: <Keys>(fromKeys: Array<Keys>) => TStringUnAr;
        keys: string[];
        key: TStringUnAr;
        text: TStringUnAr;
        focusedItemIndex: number;
        setEnabledByValue: (key: string, enabled: boolean) => void;
        setIndex: (index: number) => void;
    }
}
export { MDCList };
