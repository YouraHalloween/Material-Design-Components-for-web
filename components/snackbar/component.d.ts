import { MDCSnackbar } from './crutch';
declare class MDCSnackbarSyg extends MDCSnackbar {
    private _message;
    constructor(root: Element, ...args: any[]);
    /**
     * Устанавливает классы для контейнера
     * @param {string} cls
     * @param {boolean} prop
     * @param {boolean} value
     */
    private _setClassProperty;
    /**
     * stacked - кнопки будут на отдельной строке
     * @param {boolean} value
     */
    get stacked(): boolean;
    set stacked(value: boolean);
    /**
     * actionBaseline - отделяет кнопки от контейнера с сообещниями с права
     * @param {boolean} value
     */
    get actionBaseline(): boolean;
    set actionBaseline(value: boolean);
    /**
     * Позиция контейнера в начале экрана
     * @param {bool} value
     */
    get leading(): boolean;
    set leading(value: boolean);
    /**
     * Позиция контейнера в конце экрана
     * @param {bool} value
     */
    get trailing(): boolean;
    set trailing(value: boolean);
    get hasButtonClose(): boolean;
    set hasButtonClose(value: boolean);
    /**
     * @param {string} value
     */
    minWidth(value: string): void;
    /**
     * @param {string} value
     */
    maxWidth(value: string): void;
    /**
     * Устанавливает жесткие размеры для контейнера
     * @param {string} value
     */
    size(value: string): void;
    /**
     * Добавит сообщение в <div>message1</div>
     * Чтобы отчситить массив message, нужно открыть Snackbar
     * @param {string} message
     */
    add(message: string): void;
    /**
     * Click button
     * @param { EventListener } fn
     */
    buttonClick(fn: EventListener): void;
    /**
     * Добавить в сообщение html code
     * @param { string } text
     */
    showMessage(label?: string): void;
}
export { MDCSnackbarSyg };
