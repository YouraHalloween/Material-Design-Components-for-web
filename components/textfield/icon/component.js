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