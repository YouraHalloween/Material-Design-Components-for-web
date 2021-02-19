import { MDCSnackbar } from '@material/snackbar';

declare module '@material/snackbar/component' {
    interface MDCSnackbar {
        labelEl: HTMLElement;
        actionEl: HTMLElement;
        surfaceEl: HTMLElement;
    }
}

Object.defineProperty(MDCSnackbar.prototype, 'labelEl', {
    get(): HTMLElement {
        return this.labelEl_;
    },
    enumerable: true,
    configurable: true,
});

Object.defineProperty(MDCSnackbar.prototype, 'actionEl', {
    get(): HTMLElement {
        return this.actionEl_;
    },
    enumerable: true,
    configurable: true,
});

Object.defineProperty(MDCSnackbar.prototype, 'surfaceEl', {
    get(): HTMLElement {
        return this.surfaceEl_;
    },
    enumerable: true,
    configurable: true,
});

export { MDCSnackbar };
