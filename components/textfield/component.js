import { MDCTextField } from '@material/textfield';
import { HelperMessage } from './HelperMessage.js'
import { MDCTextFieldIcon } from '@material/textfield/icon';

MDCTextFieldIcon.prototype.owner = undefined;

/**
 * Ткая конструкция необходима, чтобы потом можно было выполнить removeEventListener
 * И при этом был доступен MDCTextFieldIcon.this
 */
MDCTextFieldIcon.prototype._disableListener = {
    th: undefined,
    handleEvent() {        
        this.th.owner.disableRenderDeactivateFocus();
    }    
};

MDCTextFieldIcon.prototype._enableListener = {
    th: undefined,
    handleEvent() {
        this.th.owner.enableRenderDeactivateFocus();
    }
};

function funcBind(th, func) {
    if (typeof func == 'function') {
        return func.bind(th);
    }
    return func;
}

MDCTextFieldIcon.prototype.click = function (func) {
    this.root.addEventListener('click', funcBind(this, func));
};

MDCTextFieldIcon.prototype.mousedown = function (func) {
    this.root.addEventListener('mousedown', funcBind(this, func));
};

MDCTextFieldIcon.prototype.mouseup = function (func) {    
    this.root.addEventListener('mouseup', funcBind(this, func));   
};
/**
 * Установит стандартное действие для кнопки Очистить     
 */
Object.defineProperty(MDCTextFieldIcon.prototype, "clear", {
    get: function () {
        if (typeof this.clear_ === 'undefined') {
            this.clear_ = false;
        }
        return this.clear_;
    },
    set: function (value) {
        if (this.clear_ === false && value === true) {
            this.click(() => {
                this.owner.value = '';
                if (this.owner.helperMessage) {
                    this.owner.helperMessage.render();
                }
                this.owner.focus();
            });
            this.disableRenderBlur = true;
        }
        this.clear_ = value;
    },
    enumerable: true,
    configurable: true
});

/**
 * Заменит иконку из aria-replace или replaceIcon
 */
Object.defineProperty(MDCTextFieldIcon.prototype, "replaceIcon", {
    get: function () {
        return this.replaceIcon_;
    },
    set: function (value) {
        this.replaceIcon_ = value;
        if (value.trim() !== '') {
            this.click(() => {
                var newIcon = this.replaceIcon_;
                this.replaceIcon_ = this.root.innerText;
                this.root.innerText = newIcon;
            });
        }
        this.replaceIcon_ = value;
    },
    enumerable: true,
    configurable: true
});

/**
 * Описание свойства в disableRenderDeactivateFocus
 */
Object.defineProperty(MDCTextFieldIcon.prototype, "disableRenderBlur", {
    get: function () {
        return this.disableRenderBlur_;
    },
    set: function (value) {
        if (this.disableRenderBlur_ != value) {
            // var func = this._disableListener.bind(this);                    
            if (value === true) {   
                this._disableListener.th = this;
                this._enableListener.th = this;
                this.mousedown(this._disableListener);
                this.mouseup(this._enableListener);
            } else {
                this.root.removeEventListener('mousedown', this._disableListener);
                this.root.removeEventListener('mouseup', this._enableListener);
            }
            this.disableRenderBlur_ = value;
        }        
    },
    enumerable: true,
    configurable: true
});

class MDCTextField_Syg extends MDCTextField {
    constructor(...args) {
        super(...args);

        this.bufDeactivateFocus_ = null;

        if (this.helperText_) {            
            var initCustomError = this.input_.hasAttribute('custom-error');
            this.helperMessage = new HelperMessage(this, initCustomError);
        }
    }
    /**
     * CustomError создается:
     * - из атрибута custom-error
     * - функцией createCustomError
     * - при обращении к свойству this.helperMessage.customError;
     * CustomError использует ошибки браузера при валидации и выводит их
     */
    createCustomError() {
        if (this.helperMessage) {
            this.helperMessage.createCustomError();
        }
    }

    /**
     * get Input Id
     */
    get id() {
        return this.input_.id;
    }

    set id(value) {
        this.input_.id = value;
    }

    /**
     * get Input type
     */
    get type() {
        return this.input_.type;
    }

    set type(value) {
        this.input_.type = value;
    }

    leadingIcon() {
        return this.leadingIcon_;
    }

    trailingIcon() {
        return this.trailingIcon_;
    }

    /**
     * override MDCTextField
     * Если используется валидация браузером, то подключить авто вывод сообщений
     * Enables or disables the use of native validation. Use this for custom validation.
     * @param {bool} value Set this to false to ignore native input validation.
     */
    get useNativeValidation() {
        return this.foundation.useNativeValidation_;
    }

    set useNativeValidation(value) {
        if (this.useNativeValidation != value) {
            this.foundation.setUseNativeValidation(value);
            if (this.helperMessage) {
                this.helperMessage.validateOnBlur = value;
            }
        }
    }

    /**
     * Ручное управление прорисовкой потери фокуса
     * Когда нажимаешь iconButton TextField.focus= false, TextField прорисовался как не активный, но
     * если в той же функции нужно вернуть focus для TextField, он прорисуется еще раз как активный
     * Для этого нужно отключить прорисовку
     */
    disableRenderDeactivateFocus() {
        this.bufDeactivateFocus_ = this.foundation.deactivateFocus;
        this.foundation.deactivateFocus = () => { };
    }

    enableRenderDeactivateFocus() {
        if (this.bufDeactivateFocus_ !== null) {
            this.foundation.deactivateFocus = this.bufDeactivateFocus_;
            this.bufDeactivateFocus_ = null;
        }
    }

    setDefaultReplaceIconClick_(iconButton) {
        if (iconButton.root.hasAttribute('aria-replace')) {
            iconButton.replaceIcon = iconButton.root.getAttribute('aria-replace');
        }
    }

    initialize(rippleFactory,
        lineRippleFactory,
        helperTextFactory,
        characterCounterFactory,
        iconFactory,
        labelFactory,
        outlineFactory) {
        super.initialize(rippleFactory,
            lineRippleFactory,
            helperTextFactory,
            characterCounterFactory,
            iconFactory,
            labelFactory,
            outlineFactory);        

        if (this.leadingIcon_) {
            this.leadingIcon_.owner = this;
            this.leadingIcon_.clear_ = false;
            this.leadingIcon_.disableRenderBlur_ = false;
            this.setDefaultReplaceIconClick_(this.leadingIcon_);
        }
        if (this.trailingIcon_) {
            this.trailingIcon_.owner = this;
            this.trailingIcon_.disableRenderBlur_ = false;
            this.trailingIcon_.clear_ = false;
            this.setDefaultReplaceIconClick_(this.trailingIcon_)
            if (this.trailingIcon_.root.hasAttribute('aria-clear')) {
                this.trailingIcon_.clear = true;
            }
        }
    }

    // destroy() {
    //     super.destroy();
    //     if (this.helperMessage)
    //         this.helperMessage.destroy();
    // }
}

export { MDCTextField_Syg }