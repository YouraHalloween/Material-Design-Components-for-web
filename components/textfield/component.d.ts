declare module '@material/textfield' {
    import { MDCTextFieldIcon } from '@material/textfield/icon';
    class MDCTextField {
        protected leadingIcon_: MDCTextFieldIcon | null;
        protected trailingIcon_: MDCTextFieldIcon | null;
    }
}
