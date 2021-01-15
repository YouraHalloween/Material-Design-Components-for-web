// import { MDCTextFieldIcon } from '@material/textfield/icon/component';
// import { MDCTextFieldSyg } from '../component';

// type TSetEvent = (fn: EventListenerOrEventListenerObject) => void;

// declare module '@material/textfield/icon/component' {
//     interface MDCTextFieldIcon {
//         // private
//         _owner: MDCTextFieldSyg;
//         _clear: boolean;
//         _replaceIcon: string;
//         _enabledRenderBlur: boolean;
//         _disabledRenderDeactivateFocus: EventListener;
//         _enabledRenderDeactivateFocus: EventListener;
//         _handleDisabledRenderDeactivateFocus: EventListener;
//         _handleEnabledRenderDeactivateFocus: EventListener;
//         _addEvent: (
//             nameEvent: string,
//             fn: EventListenerOrEventListenerObject
//         ) => void;
//         // public
//         clear: boolean;
//         enabledRenderBlur: boolean;
//         owner: MDCTextFieldSyg;
//         click: TSetEvent;
//         mousedown: TSetEvent;
//         mouseup: TSetEvent;
//     }
// }

// const initialize = MDCTextFieldIcon.prototype.initialize;
// MDCTextFieldIcon.prototype.initialize = function (..._args: unknown[]) {
//     initialize(..._args);
//     this._clear = false;
//     this._enabledRenderBlur = false;
//     this._replaceIcon = '';
//     this._handleDisabledRenderDeactivateFocus = this._disabledRenderDeactivateFocus.bind(
//         this
//     );
//     this._handleEnabledRenderDeactivateFocus = this._enabledRenderDeactivateFocus.bind(
//         this
//     );
// };

// /**
//  * Ткая конструкция необходима, чтобы потом можно было выполнить removeEventListener
//  * И при этом был доступен MDCTextFieldIcon.this
//  */
// MDCTextFieldIcon.prototype._disabledRenderDeactivateFocus = function () {
//     this.owner.disabledRenderDeactivateFocus();
// };

// MDCTextFieldIcon.prototype._enabledRenderDeactivateFocus = function () {
//     this.owner.enabledRenderDeactivateFocus();
// };

// MDCTextFieldIcon.prototype._addEvent = function (
//     nameEvent: string,
//     fn: EventListenerOrEventListenerObject
// ): void {
//     this.root.addEventListener(nameEvent, fn);
//     this.enabledRenderBlur = true;
// };

// MDCTextFieldIcon.prototype.click = function (
//     fn: EventListenerOrEventListenerObject
// ) {
//     this._addEvent('click', fn);
// };

// MDCTextFieldIcon.prototype.mousedown = function (
//     fn: EventListenerOrEventListenerObject
// ) {
//     this._addEvent('mousedown', fn);
// };

// MDCTextFieldIcon.prototype.mouseup = function (
//     fn: EventListenerOrEventListenerObject
// ) {
//     this._addEvent('mouseup', fn);
// };

// Object.defineProperty(MDCTextFieldIcon.prototype, 'owner', {
//     get(): MDCTextFieldSyg {
//         return this._owner;
//     },
//     set(value: MDCTextFieldSyg) {
//         this._owner = value;
//     },
//     enumerable: true,
//     configurable: true,
// });

// /**
//  * Установит стандартное действие для кнопки Очистить
//  */
// Object.defineProperty(MDCTextFieldIcon.prototype, 'clear', {
//     get(): boolean {
//         if (typeof this._clear === 'undefined') {
//             this._clear = false;
//         }
//         return this._clear;
//     },
//     set(value: boolean) {
//         if (this._clear === false && value === true) {
//             this.click(() => {
//                 this.owner.value = '';
//                 if (this.owner.helperMessage) {
//                     this.owner.helperMessage.render();
//                 }
//                 this.owner.focus();
//             });
//         }
//         this._clear = value;
//     },
//     enumerable: true,
//     configurable: true,
// });

// /**
//  * Заменит иконку из aria-replace или replaceIcon
//  */
// Object.defineProperty(MDCTextFieldIcon.prototype, 'replaceIcon', {
//     get(): string {
//         return this._replaceIcon;
//     },
//     set(value: string) {
//         this._replaceIcon = value;
//         if (value.trim() !== '') {
//             this.click(() => {
//                 const newIcon: string = this._replaceIcon;
//                 this._replaceIcon = this.root.innerText;
//                 this.root.innerText = newIcon;
//             });
//         }
//         this._replaceIcon = value;
//     },
//     enumerable: true,
//     configurable: true,
// });

// /**
//  * Описание свойства в disableRenderDeactivateFocus
//  */
// Object.defineProperty(MDCTextFieldIcon.prototype, 'enabledRenderBlur', {
//     get(): boolean {
//         return this._enabledRenderBlur;
//     },
//     set(value: boolean) {
//         if (this._enabledRenderBlur !== value) {
//             this._enabledRenderBlur = value;
//             if (value === true) {
//                 this.mousedown(this._handleDisabledRenderDeactivateFocus);
//                 this.mouseup(this._handleEnabledRenderDeactivateFocus);
//             } else {
//                 this.root.removeEventListener(
//                     'mousedown',
//                     this._handleDisabledRenderDeactivateFocus
//                 );
//                 this.root.removeEventListener(
//                     'mouseup',
//                     this._handleEnabledRenderDeactivateFocus
//                 );
//             }
//         }
//     },
//     enumerable: true,
//     configurable: true,
// });

// export { MDCTextFieldIcon };
