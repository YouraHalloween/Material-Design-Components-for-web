import { MDCList } from '@material/list/component';
import { TStringUnAr } from './../_types';
declare module '@material/list/component' {
    interface MDCList {
        _values: string[];
        _getValueList: <Values>(fromValues: Values[]) => TStringUnAr;
        values: string[];
        value: TStringUnAr;
        text: TStringUnAr;
        focusedItemIndex: number;
        setEnabledByValue: (value: string, enabled: boolean) => void;
        setIndex: (index: number) => void;
    }
}
export { MDCList };
