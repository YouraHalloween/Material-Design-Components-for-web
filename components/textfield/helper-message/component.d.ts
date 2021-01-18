import { MDCTextFieldSyg } from './../component';
import { TStringUn } from './../../_types';
/**
 * this._message имеет такую структуру
 * {
 * customError: '',
 * badInput: '',
 * stepMismatch: '',
 * rangeOverflow: '',
 * rangeUnderFlow: '',
 * tooLong: '',
 * tooShort: '',
 * patternMismatch: '',
 * typeMismatch: '',
 * valueMissing: ''
 * };
 */
declare type TMessage<T> = {
    -readonly [K in keyof T]?: string;
};
declare type TMessageValidity = TMessage<ValidityState>;
declare class HelperMessage {
    private _info?;
    private _error?;
    private _ex;
    private _bufferCurrentMessage?;
    private _handleEventBlur;
    private _validateOnBlur;
    parent: MDCTextFieldSyg;
    useNativeMessage: boolean;
    /**
     * @param {MDCTextFieldSyg} parent
     */
    constructor(parent: MDCTextFieldSyg);
    private _getPropertyValid;
    get info(): TStringUn;
    set info(value: TStringUn);
    get error(): TStringUn;
    set error(value: TStringUn);
    get ex(): TMessageValidity;
    set ex(value: TMessageValidity);
    /**
     * Вернуть текущий мессадж
     * Проверка на Valid, после пытаемся найти сообщение об ошибке
     * Если сообщение об ошибке не найдено, выводим какой нибудь Info
     * Если не найдено выводим пусто
     */
    get message(): TStringUn;
    /**
     * Вернуть либо расширенный месадж, либо из свойства validationMessage
     */
    exMessage(): TStringUn;
    get valid(): boolean;
    /**
     * Следим за изменением кпомпонента
     * Создается в конструкторе компонента, если изначально заданы условия валидации
     */
    get validateOnBlur(): boolean;
    set validateOnBlur(value: boolean);
    /**
     * @param {String} text
     */
    render(text?: TStringUn): void;
}
export { HelperMessage };
