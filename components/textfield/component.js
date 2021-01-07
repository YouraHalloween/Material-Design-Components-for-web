import { MDCTextField } from '@material/textfield';
import { HelperMessage } from './helper-message/component'

class MDCTextFieldSyg extends MDCTextField {    

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

    /**
     * get value component
     */
    get key() {
        return this._key;
    }

    set key(value) {
        this._key = value;
    }

    /**
     * get button icon
     */
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

export { MDCTextFieldSyg }