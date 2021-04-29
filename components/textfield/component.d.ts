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
    initialize(rippleFactory?: MDCRippleFactory, lineRippleFactory?: MDCLineRippleFactory, helperTextFactory?: MDCTextFieldHelperTextFactory, characterCounterFactory?: MDCTextFieldCharacterCounterFactory, iconFactory?: MDCTextFieldIconFactory, labelFactory?: MDCFloatingLabelFactory, outlineFactory?: MDCNotchedOutlineFactory): void;
    clear(): void;
}
import { MDCTextFieldIcon } from '@material/textfield/icon/component';
declare type TSetEvent = (fn: EventListener, context?: any) => void;
declare module '@material/textfield/icon/component' {
    interface MDCTextFieldIcon {
        _parent: MDCTextFieldSyg;
        _clear: boolean;
        _stopParentBlurEvent: boolean;
        _eventMouseDown: EventListener;
        _eventParentBlur: EventListener;
        _handleEventMouseDown: EventListener;
        _handleEventParentBlur: EventListener;
        _tmpFocusButton: boolean;
        _addEvent: (nameEvent: string, fn: EventListener, context?: any) => void;
        clear: boolean;
        stopParentBlurEvent: boolean;
        parent: MDCTextFieldSyg;
        click: TSetEvent;
        mousedown: TSetEvent;
        mouseup: TSetEvent;
    }
}
export { MDCTextFieldSyg, MDCTextFieldIcon };
