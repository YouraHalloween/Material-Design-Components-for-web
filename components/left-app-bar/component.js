const MDCLeftAppBar_Syg = (function () {
    let _eventlick = function () { };
    let _itemActive = null;

    function MDCLeftAppBar_Syg(root) {
        this.root = root;
        let _itemActive = this.root.querySelector('.mdc-left-app-bar-item__label.active');
        let items = this.root.querySelectorAll('.mdc-left-app-bar-item__label');
        for (let item of items) {
            let menuIndex = item.getAttribute('menu-index');
            item.addEventListener('click', (event) => {
                if (_itemActive != item) {
                    item.classList.add('active');
                    if (_itemActive !== null) {
                        _itemActive.classList.remove('active');
                    }
                    _itemActive = item;
                    _eventlick(menuIndex, event);
                }
            });
        }
    }

    MDCLeftAppBar_Syg.attachTo = function (root) {
        return new MDCLeftAppBar_Syg(root);
    };

    MDCLeftAppBar_Syg.prototype.listen = function (func) {
        _eventlick = func;        
    };

    return MDCLeftAppBar_Syg;
})();

export { MDCLeftAppBar_Syg };