import { MDCButton_Syg } from './../button/component';
import { MDCCheckbox } from '@material/checkbox';
import { MDCLinearProgress } from '@material/linear-progress'
import { MDCRipple } from '@material/ripple';
import { MDCSnackbar } from '@material/snackbar';
import { MDCTextField_Syg } from './../textfield/component';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCList } from './../list/component.js';
import { MDCMenu } from './../menu/component.js';
import { MDCRadio } from '@material/radio';
import { MDCSpinner } from './../spinner/component.js';
import { MDCLeftAppBar_Syg } from './../left-app-bar/component.js';
import { MDCDrawer_Syg } from './../drawer/component.js'

const _classes = {
    checkbox: MDCCheckbox,
    ripple: MDCRipple,
    snackbar: MDCSnackbar,
    textField: MDCTextField_Syg,
    topAppBar: MDCTopAppBar,
    button: MDCButton_Syg,
    linearProgress: MDCLinearProgress,
    menu: MDCMenu,
    list: MDCList,
    radio: MDCRadio,
    spinner: MDCSpinner,
    drawer: MDCDrawer_Syg,
    leftAppBar: MDCLeftAppBar_Syg
};

const CollectionControl = (function () {
    let _items;
    let _groups;    

    function CollectionControl() {
        _items = {};
        _groups = {};
    }

    /**
     * Добавить MDC контрол 
     * @param {string} id - id node
     * @param {string} control - var _classes
     * @param {object} property     
     * @param {string} groupName - владелец или контейнер для группы компонентов
     */
    CollectionControl.prototype.add = function (id, control, property, groupName) {
        let node = document.getElementById(id);
        if (node.nodeName.toLowerCase() == 'input') {
            node = node.parentNode;
        }
        let cntr = _items[id] = new _classes[control](node);

        if (groupName && groupName.trim() != '') {
            if (!_groups[groupName]) {
                _groups[groupName] = [];
            }
            _groups[groupName].push(_items[id]);
        }

        if (property) {
            for (var key in property) {
                cntr[key] = property[key];
            }
        }
        return cntr;
    }

    /**
     * Добавить готовый контрол
     * @param {object} control 
     */
    CollectionControl.prototype.addControl = function (control) {
        return _items[control.id] = control;
    }

    CollectionControl.prototype.item = function (id) {
        return _items[id];
    }

    CollectionControl.prototype.group = function (id) {
        return _groups[id];
    }

    CollectionControl.prototype.groupEnabled = function (groupName, enabled) {        
        _group[groupName].forEach(item => {
            if (typeof (item.disabled) != 'undefined') {
                item.disabled = !enabled;
            }
        });
    }

    return CollectionControl;
})();

export { CollectionControl };
