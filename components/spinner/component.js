const SpinnerSyg = (function () {

    let _size = {
        'extra-small': 'mdc-spinner-extra-small',
        'small': 'mdc-spinner-small',
        'medium': 'mdc-spinner-medium',
        'large': 'mdc-spinner-large'        
    }

    let _durationHidden = 150;

    SpinnerSyg.attachTo = function (root) {
        return new SpinnerSyg(root);
    };

    function SpinnerSyg(root) {
        this.root = root;
    }

    Object.defineProperty(SpinnerSyg.prototype, "size", {
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

    Object.defineProperty(SpinnerSyg.prototype, "durationHidden", {
        get: function () {
            return _durationHidden;
        },
        set: function (value) {
            _durationHidden = value;
        },
        enumerable: true,
        configurable: true
    });

    SpinnerSyg.prototype.isOpen = function () {
        return this.root.classList.contains('mdc-spinner--open');
    }

    SpinnerSyg.prototype.open = function () {
        this.root.classList.add('mdc-spinner--open'); 
        setTimeout(() => {
            this.root.classList.add('animate');
        }, 20);  
    };

    SpinnerSyg.prototype.close = function () {
        this.root.classList.remove('animate');
        setTimeout(() => {
            this.root.classList.remove('mdc-spinner--open');
        }, _durationHidden); 
    };

    SpinnerSyg.prototype.toggle = function () {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    return SpinnerSyg;
})();

export { SpinnerSyg };