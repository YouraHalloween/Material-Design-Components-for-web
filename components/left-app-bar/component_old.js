const TLeftAppBarSyg = (function () {
    let _eventlick = function () { };
    function TLeftAppBarSyg(root) {
        this.root = root;

        var itemActive = this.root.querySelector('.mdc-left-app-bar-item__label.active');
        let items = this.root.querySelectorAll('.mdc-left-app-bar-item__label');

        for (const key in items) {
            if (items.hasOwnProperty(key)) {
                const item = items[key];
                const menuIndex = item.getAttribute('menu-index');
                item.addEventListener('click', (event) => {
                    if (itemActive != item) {
                        item.classList.add('active');
                        if (itemActive !== null) {
                            itemActive.classList.remove('active');
                        }
                        itemActive = item;
                        _eventlick(menuIndex, event);
                    }
                });
            } else {
                break;
            }
        }
    }

    TLeftAppBarSyg.attachTo = function (root) {
        return new TLeftAppBarSyg(root);
    };

    TLeftAppBarSyg.prototype.listen = function (fn) {
        _eventlick = fn;
    };

    return TLeftAppBarSyg;
})();

export { TLeftAppBarSyg };