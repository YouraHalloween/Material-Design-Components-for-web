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
export { MDCTextField };
