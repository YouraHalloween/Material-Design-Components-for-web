import { TStringUn } from './../_types';
import { MDCTextField } from './crutch';
import { HelperMessage } from './helper-message/component';
// import type { MDCTextFieldIcon } from './icon/component';

// Export classes for method Initialize
import { MDCFloatingLabelFactory } from '@material/floating-label/component';
import { MDCLineRippleFactory } from '@material/line-ripple/component';
import { MDCNotchedOutlineFactory } from '@material/notched-outline/component';
import { MDCRippleFactory } from '@material/ripple/component';
import { MDCTextFieldCharacterCounterFactory } from '@material/textfield/character-counter/component';
import { MDCTextFieldHelperTextFactory } from '@material/textfield/helper-text/component';
import { MDCTextFieldIconFactory } from '@material/textfield/icon/component';

class MDCTextFieldSyg extends MDCTextField {
    private _key?: TStringUn;
    public helperMessage?: HelperMessage;

    constructor(root: Element, ...args: any[]) {
        super(root, ...args);

        if (this.helperText) {
            this.helperMessage = new HelperMessage(this);
        }
    }

    /**
     * get Input Id
     */
    get id(): string {
        return this.input.id;
    }

    set id(value: string) {
        this.input.id = value;
    }

    /**
     * get Input type
     */
    get type(): string {
        return this.input.type;
    }

    set type(value: string) {
        this.input.type = value;
    }

    /**
     * get value component
     */
    get key(): TStringUn {
        return this._key;
    }

    set key(value: TStringUn) {
        this._key = value;
    }

    initialize(
        rippleFactory?: MDCRippleFactory,
        lineRippleFactory?: MDCLineRippleFactory,
        helperTextFactory?: MDCTextFieldHelperTextFactory,
        characterCounterFactory?: MDCTextFieldCharacterCounterFactory,
        iconFactory?: MDCTextFieldIconFactory,
        labelFactory?: MDCFloatingLabelFactory,
        outlineFactory?: MDCNotchedOutlineFactory
    ) {
        super.initialize(
            rippleFactory,
            lineRippleFactory,
            helperTextFactory,
            characterCounterFactory,
            iconFactory,
            labelFactory,
            outlineFactory
        );

        if (this.leadingIcon) {
            this.leadingIcon.parent = this;
        }
        if (this.trailingIcon) {
            this.trailingIcon.parent = this;
        }
    }

    clear(): void {
        this.value = '';
        this.key = undefined;
    }
}

import { MDCTextFieldIcon } from '@material/textfield/icon/component';

type TSetEvent = (fn: EventListener, context?: any) => void;

declare module '@material/textfield/icon/component' {
    interface MDCTextFieldIcon {
        // private
        _parent: MDCTextFieldSyg;
        _clear: boolean;
        _stopParentBlurEvent: boolean;
        _eventMouseDown: EventListener;
        _eventParentBlur: EventListener;
        _handleEventMouseDown: EventListener;
        _handleEventParentBlur: EventListener;
        _tmpFocusButton: boolean;
        _addEvent: (
            nameEvent: string,
            fn: EventListener,
            context?: any
        ) => void;
        // public
        clear: boolean;
        stopParentBlurEvent: boolean;
        parent: MDCTextFieldSyg;
        click: TSetEvent;
        mousedown: TSetEvent;
        mouseup: TSetEvent;
    }
}

const initialize = MDCTextFieldIcon.prototype.initialize;

MDCTextFieldIcon.prototype.initialize = function (..._args: unknown[]) {
    initialize(..._args);
    this._clear = false;
    this._stopParentBlurEvent = false;
    this._handleEventMouseDown = this._eventMouseDown.bind(this);
    this._handleEventParentBlur = this._eventParentBlur.bind(this);
};

MDCTextFieldIcon.prototype._eventMouseDown = function () {
    this._tmpFocusButton = true;
};

MDCTextFieldIcon.prototype._eventParentBlur = function (evt: Event) {
    if (this._tmpFocusButton) {
        this._tmpFocusButton = false;
        evt.stopImmediatePropagation();
        this.parent.input.focus();
    }
};

MDCTextFieldIcon.prototype._addEvent = function (
    nameEvent: string,
    fn: EventListener,
    context?: any
): void {
    if (context) {
        fn = fn.bind(context);
    }
    this.root.addEventListener(nameEvent, fn.bind(this));
};

MDCTextFieldIcon.prototype.click = function (fn: EventListener, context?: any) {
    this._addEvent('click', fn, context);
    this.stopParentBlurEvent = true;
};

MDCTextFieldIcon.prototype.mousedown = function (
    fn: EventListener,
    context?: any
) {
    this._addEvent('mousedown', fn, context);
};

MDCTextFieldIcon.prototype.mouseup = function (
    fn: EventListener,
    context?: any
) {
    this._addEvent('mouseup', fn, context);
};

Object.defineProperty(MDCTextFieldIcon.prototype, 'parent', {
    get(): MDCTextFieldSyg {
        return this._parent;
    },
    set(value: MDCTextFieldSyg) {
        this._parent = value;
    },
    enumerable: true,
    configurable: true,
});

/**
 * Установит стандартное действие для кнопки Очистить
 */
Object.defineProperty(MDCTextFieldIcon.prototype, 'clear', {
    get(): boolean {
        if (typeof this._clear === 'undefined') {
            this._clear = false;
        }
        return this._clear;
    },
    set(value: boolean) {
        if (this._clear === false && value === true) {
            this.click(() => {
                this.parent.clear();
                if (this.parent.helperMessage) {
                    this.parent.helperMessage.render();
                }

                this.parent.focus();
            });
        }
        if (!value) {
            this.stopParentBlurEvent = false;
        }
        this._clear = value;
    },
    enumerable: true,
    configurable: true,
});

/**
 * Описание свойства в disableRenderDeactivateFocus
 */
Object.defineProperty(MDCTextFieldIcon.prototype, 'stopParentBlurEvent', {
    get(): boolean {
        return this._stopParentBlurEvent;
    },
    set(value: boolean) {
        if (this._stopParentBlurEvent !== value) {
            this._stopParentBlurEvent = value;
            if (value === true) {
                this.mousedown(this._handleEventMouseDown);
                this.parent.input.addEventListener(
                    'blur',
                    this._handleEventParentBlur,
                    { capture: true }
                );
            } else {
                this.root.removeEventListener(
                    'mousedown',
                    this._handleEventMouseDown
                );
                this.parent.input.removeEventListener(
                    'blur',
                    this._handleEventParentBlur,
                    { capture: true }
                );
            }
        }
    },
    enumerable: true,
    configurable: true,
});

export { MDCTextFieldSyg, MDCTextFieldIcon };
