import { TStringUn } from './../_types';
import { MDCTextField } from './crutch';
import { HelperMessage } from './helper-message/component';
import { MDCFloatingLabelFactory } from '@material/floating-label/component';
import { MDCLineRippleFactory } from '@material/line-ripple/component';
import { MDCNotchedOutlineFactory } from '@material/notched-outline/component';
import { MDCRippleFactory } from '@material/ripple/component';
import { MDCTextFieldCharacterCounterFactory } from '@material/textfield/character-counter/component';
import { MDCTextFieldHelperTextFactory } from '@material/textfield/helper-text/component';
import { MDCTextFieldIconFactory } from '@material/textfield/icon/component';
declare class MDCTextFieldSyg extends MDCTextField {
    private _key?;
    private _bufDeactivateFocus;
    helperMessage?: HelperMessage;
    constructor(root: Element, ...args: any[]);
    /**
     * get Input Id
     */
    get id(): string;
    set id(value: string);
    /**
     * get Input type
     */
    get type(): string;
    set type(value: string);
    /**
     * get value component
     */
    get key(): TStringUn;
    set key(value: TStringUn);
    /**
     * Ручное управление прорисовкой потери фокуса
     * Когда нажимаешь iconButton TextField.focus= false, TextField прорисовался как не активный, но
     * если в той же функции нужно вернуть focus для TextField, он прорисуется еще раз как активный
     * Для этого нужно отключить прорисовку
     */
    disabledRenderDeactivateFocus(): void;
    enabledRenderDeactivateFocus(): void;
    initialize(rippleFactory?: MDCRippleFactory, lineRippleFactory?: MDCLineRippleFactory, helperTextFactory?: MDCTextFieldHelperTextFactory, characterCounterFactory?: MDCTextFieldCharacterCounterFactory, iconFactory?: MDCTextFieldIconFactory, labelFactory?: MDCFloatingLabelFactory, outlineFactory?: MDCNotchedOutlineFactory): void;
}
import { MDCTextFieldIcon } from '@material/textfield/icon/component';
declare type TSetEvent = (fn: EventListener, context?: any) => void;
declare module '@material/textfield/icon/component' {
    interface MDCTextFieldIcon {
        _parent: MDCTextFieldSyg;
        _clear: boolean;
        _replaceIcon: string;
        _enabledRenderBlur: boolean;
        _disabledRenderDeactivateFocus: EventListener;
        _enabledRenderDeactivateFocus: EventListener;
        _handleDisabledRenderDeactivateFocus: EventListener;
        _handleEnabledRenderDeactivateFocus: EventListener;
        _addEvent: (nameEvent: string, fn: EventListener, context?: any) => void;
        clear: boolean;
        enabledRenderBlur: boolean;
        parent: MDCTextFieldSyg;
        click: TSetEvent;
        mousedown: TSetEvent;
        mouseup: TSetEvent;
    }
}
export { MDCTextFieldSyg, MDCTextFieldIcon };
