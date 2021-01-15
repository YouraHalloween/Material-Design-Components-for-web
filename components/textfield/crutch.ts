import { MDCTextField } from '@material/textfield/component';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text/component';
import { MDCTextFieldIcon } from './component';

declare module '@material/textfield/component' {
    interface MDCTextField {
        useNativeValidation: boolean;
        helperText: MDCTextFieldHelperText;
        input: HTMLInputElement;
        leadingIcon: MDCTextFieldIcon;
        trailingIcon: MDCTextFieldIcon;
    }
}

Object.defineProperty(MDCTextField.prototype, 'useNativeValidation', {
    get(): boolean {
        return this.foundation.useNativeValidation_;
    },
    set(value: boolean) {
        if (this.useNativeValidation !== value) {
            this.foundation.setUseNativeValidation(value);
        }
    },
    enumerable: true,
    configurable: true,
});

Object.defineProperty(MDCTextField.prototype, 'helperText', {
    get(): MDCTextFieldHelperText {
        return this.helperText_;
    },
    enumerable: true,
    configurable: true,
});

Object.defineProperty(MDCTextField.prototype, 'input', {
    get(): HTMLInputElement {
        return this.input_;
    },
    enumerable: true,
    configurable: true,
});

Object.defineProperty(MDCTextField.prototype, 'leadingIcon', {
    get(): MDCTextFieldIcon {
        return this.leadingIcon_;
    },
    enumerable: true,
    configurable: true,
});

Object.defineProperty(MDCTextField.prototype, 'trailingIcon', {
    get(): MDCTextFieldIcon {
        return this.trailingIcon_;
    },
    enumerable: true,
    configurable: true,
});

export { MDCTextField };
