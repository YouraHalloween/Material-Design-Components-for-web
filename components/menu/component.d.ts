import { MDCMenu } from '@material/menu/component';
import { MDCList } from './../list/component';
import { TStringUnAr } from './../_types';
declare module '@material/menu/component' {
    interface MDCMenu {
        list: MDCList;
        key: TStringUnAr;
        keys: string[];
        text: TStringUnAr;
        setEnabledByValue: (key: string, enabled: boolean) => void;
    }
}
export { MDCMenu };
