const MDCSpinner = (function () {

    let _size = {
        'extra-small': 'mdc-spinner-extra-small',
        'small': 'mdc-spinner-small',
        'medium': 'mdc-spinner-medium',
        'large': 'mdc-spinner-large'        
    }

    let _durationHidden = 150;

    MDCSpinner.attachTo = function (root) {
        return new MDCSpinner(root);
    };

    function MDCSpinner(root) {
        this.root = root;
    }

    Object.defineProperty(MDCSpinner.prototype, "size", {
        get: function () {
            for (var key in _size) {
                var cls = _size[key];
                if (this.root.classList.contains(cls)) {
                    return key;
                }
            }
            return null;    
        },
        set: function (value) {            
            for (var key in _size) {                
                this.root.classList.remove(_size[key]);                
            }            
            this.root.classList.add(_size[value]);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(MDCSpinner.prototype, "durationHidden", {
        get: function () {
            return _durationHidden;
        },
        set: function (value) {
            _durationHidden = value;
        },
        enumerable: true,
        configurable: true
    });

    MDCSpinner.prototype.isOpen = function () {
        return this.root.classList.contains('mdc-spinner--open');
    }

    MDCSpinner.prototype.open = function () {
        this.root.classList.add('mdc-spinner--open'); 
        setTimeout(() => {
            this.root.classList.add('animate');
        }, 20);  
    };

    MDCSpinner.prototype.close = function () {
        this.root.classList.remove('animate');
        setTimeout(() => {
            this.root.classList.remove('mdc-spinner--open');
        }, _durationHidden); 
    };

    MDCSpinner.prototype.toggle = function () {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    return MDCSpinner;
})();

export { MDCSpinner };