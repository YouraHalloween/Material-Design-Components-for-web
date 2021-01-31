import { MDCMenu } from '@material/menu/component';
import { MDCList } from './../list/component';
import { TStringUnAr } from './../_types';
declare module '@material/menu/component' {
    interface MDCMenu {
        list: MDCList;
        value: TStringUnAr;
        values: string[];
        text: TStringUnAr;
        setEnabledByValue: (value: string, enabled: boolean) => void;
    }
}
export { MDCMenu };
