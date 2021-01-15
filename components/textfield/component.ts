
import { TUnString } from './../_types';
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
    private _key?: TUnString;
    private _bufDeactivateFocus: any;
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
    get key(): TUnString {
        return this._key;
    }

    set key(value: TUnString) {
        this._key = value;
    }

    /**
     * Ручное управление прорисовкой потери фокуса
     * Когда нажимаешь iconButton TextField.focus= false, TextField прорисовался как не активный, но
     * если в той же функции нужно вернуть focus для TextField, он прорисуется еще раз как активный
     * Для этого нужно отключить прорисовку
     */
    disabledRenderDeactivateFocus() {
        this._bufDeactivateFocus = this.foundation.deactivateFocus;
        // tslint:disable-next-line: no-empty
        this.foundation.deactivateFocus = (): void => {};
    }

    enabledRenderDeactivateFocus() {
        if (this._bufDeactivateFocus !== null) {
            this.foundation.deactivateFocus = this._bufDeactivateFocus;
            this._bufDeactivateFocus = null;
        }
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
            this.leadingIcon.owner = this;
        }
        if (this.trailingIcon) {
            this.trailingIcon.owner = this;
        }
    }
}

import { MDCTextFieldIcon } from '@material/textfield/icon/component';

type TSetEvent = (fn: EventListenerOrEventListenerObject) => void;

declare module '@material/textfield/icon/component' {
    interface MDCTextFieldIcon {
        // private
        _owner: MDCTextFieldSyg;
        _clear: boolean;
        _replaceIcon: string;
        _enabledRenderBlur: boolean;
        _disabledRenderDeactivateFocus: EventListener;
        _enabledRenderDeactivateFocus: EventListener;
        _handleDisabledRenderDeactivateFocus: EventListener;
        _handleEnabledRenderDeactivateFocus: EventListener;
        _addEvent: (
            nameEvent: string,
            fn: EventListenerOrEventListenerObject
        ) => void;
        // public
        clear: boolean;
        enabledRenderBlur: boolean;
        owner: MDCTextFieldSyg;
        click: TSetEvent;
        mousedown: TSetEvent;
        mouseup: TSetEvent;
    }
}

const initialize = MDCTextFieldIcon.prototype.initialize;
MDCTextFieldIcon.prototype.initialize = function (..._args: unknown[]) {
    initialize(..._args);
    this._clear = false;
    this._enabledRenderBlur = false;
    this._replaceIcon = '';
    this._handleDisabledRenderDeactivateFocus = this._disabledRenderDeactivateFocus.bind(
        this
    );
    this._handleEnabledRenderDeactivateFocus = this._enabledRenderDeactivateFocus.bind(
        this
    );
};

/**
 * Ткая конструкция необходима, чтобы потом можно было выполнить removeEventListener
 * И при этом был доступен MDCTextFieldIcon.this
 */
MDCTextFieldIcon.prototype._disabledRenderDeactivateFocus = function () {
    this.owner.disabledRenderDeactivateFocus();
};

MDCTextFieldIcon.prototype._enabledRenderDeactivateFocus = function () {
    this.owner.enabledRenderDeactivateFocus();
};

MDCTextFieldIcon.prototype._addEvent = function (
    nameEvent: string,
    fn: EventListenerOrEventListenerObject
): void {
    this.root.addEventListener(nameEvent, fn);
    this.enabledRenderBlur = true;
};

MDCTextFieldIcon.prototype.click = function (
    fn: EventListenerOrEventListenerObject
) {
    this._addEvent('click', fn);
};

MDCTextFieldIcon.prototype.mousedown = function (
    fn: EventListenerOrEventListenerObject
) {
    this._addEvent('mousedown', fn);
};

MDCTextFieldIcon.prototype.mouseup = function (
    fn: EventListenerOrEventListenerObject
) {
    this._addEvent('mouseup', fn);
};

Object.defineProperty(MDCTextFieldIcon.prototype, 'owner', {
    get(): MDCTextFieldSyg {
        return this._owner;
    },
    set(value: MDCTextFieldSyg) {
        this._owner = value;
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
                this.owner.value = '';
                if (this.owner.helperMessage) {
                    this.owner.helperMessage.render();
                }
                this.owner.focus();
            });
        }
        this._clear = value;
    },
    enumerable: true,
    configurable: true,
});

/**
 * Заменит иконку из aria-replace или replaceIcon
 */
Object.defineProperty(MDCTextFieldIcon.prototype, 'replaceIcon', {
    get(): string {
        return this._replaceIcon;
    },
    set(value: string) {
        this._replaceIcon = value;
        if (value.trim() !== '') {
            this.click(() => {
                const newIcon: string = this._replaceIcon;
                this._replaceIcon = this.root.innerText;
                this.root.innerText = newIcon;
            });
        }
        this._replaceIcon = value;
    },
    enumerable: true,
    configurable: true,
});

/**
 * Описание свойства в disableRenderDeactivateFocus
 */
Object.defineProperty(MDCTextFieldIcon.prototype, 'enabledRenderBlur', {
    get(): boolean {
        return this._enabledRenderBlur;
    },
    set(value: boolean) {
        if (this._enabledRenderBlur !== value) {
            this._enabledRenderBlur = value;
            if (value === true) {
                this.mousedown(this._handleDisabledRenderDeactivateFocus);
                this.mouseup(this._handleEnabledRenderDeactivateFocus);
            } else {
                this.root.removeEventListener(
                    'mousedown',
                    this._handleDisabledRenderDeactivateFocus
                );
                this.root.removeEventListener(
                    'mouseup',
                    this._handleEnabledRenderDeactivateFocus
                );
            }
        }
    },
    enumerable: true,
    configurable: true,
});

export { MDCTextFieldSyg, MDCTextFieldIcon };


