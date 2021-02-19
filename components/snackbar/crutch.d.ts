import { MDCSnackbar } from '@material/snackbar';
declare module '@material/snackbar/component' {
    interface MDCSnackbar {
        labelEl: HTMLElement;
        actionEl: HTMLElement;
        surfaceEl: HTMLElement;
    }
}
export { MDCSnackbar };
