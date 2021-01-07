
import { TButtonSyg } from './../button/component';
import { MDCCheckbox } from '@material/checkbox';
import { MDCLinearProgress } from '@material/linear-progress'
import { MDCRipple } from '@material/ripple';
import { MDCSnackbar } from '@material/snackbar';
import { MDCTextFieldSyg } from '../textfield/component';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCList } from '../list/component';
import { MDCMenu } from './../menu/component';
import { MDCRadio } from '@material/radio';
import { TSpinnerSyg } from './../spinner/component';
import { TLeftAppBarSyg } from './../left-app-bar/component';
import { MDCDrawerSyg } from './../drawer/component'

const _classes = {
    checkbox: MDCCheckbox,
    ripple: MDCRipple,
    snackbar: MDCSnackbar,
    textField: MDCTextFieldSyg,
    topAppBar: MDCTopAppBar,
    button: TButtonSyg,
    linearProgress: MDCLinearProgress,
    menu: MDCMenu,
    list: MDCList,
    radio: MDCRadio,
    spinner: TSpinnerSyg,
    drawer: MDCDrawerSyg,
    leftAppBar: TLeftAppBarSyg
};

const CollectionControl = (function () {
    let _items;
    let _cacheGroup= {id: '', items: {}};
    function CollectionControl() {
        _items = {};        
    }

    function setItemProp(id, property, value) {
        if (typeof value != 'undefined') {
            if (typeof _items[id] == 'undefined') {
                _items[id] = {};
            }
            _items[id][property] = value;
        }
    }

    /**
     * Добавить MDC контрол
     * @param {string} id - id node
     * @param {string} className - var _classes
     * @param {object} property
     * @param {string} groupName - владелец или контейнер для группы компонентов
     */
    CollectionControl.prototype.add = function (id, className, property, groupName) {
        let node = document.getElementById(id);
        if (node.nodeName.toLowerCase() == 'input') {
            node = node.parentNode;
        }

        let cntr = new _classes[className](node);        

        if (property) {
            for (const key in property) {
                cntr[key] = property[key];
            }
        }

        this.addControl(cntr, className, groupName, id);

        return cntr;
    };

    /**
     * Добавить готовый контрол
     * @param {object} control
     * @param {string} className
     */
    CollectionControl.prototype.addControl = function (control, className, groupName, id) {
        id = typeof id == 'undefined' ? control.id : id;

        setItemProp(id, 'item', control);
        setItemProp(id, 'class', className);
        if (groupName) {
            setItemProp(id, 'group', groupName);
        } 
               
        return _items[id];
    };

    /**
     * Возвращает item
     * @param {string} id 
     */
    CollectionControl.prototype.item = function (id) {
        return _items[id].item;
    };

    /**
     * Вовзаращет список контролов из массива ids
     * @param {array} ids 
     */
    CollectionControl.prototype.items = function (ids) {
        let result = [];
        ids.forEach(id => {
            result.push(_items[id]);
        });
        return result;
    };

    /**
     * Возвращает список контролов принадлжеащих одной группе
     * @param {string} groupName
     */
    CollectionControl.prototype.group = function (groupName) {
        if (_cacheGroup.id != groupName) {
            _cacheGroup.id = groupName;
            for (const key in _items) {
                if (_items.hasOwnProperty(key) && _items[key].group == groupName) {
                    _cacheGroup.items[key] = _items[key];                    
                }
            }
        }
        return _cacheGroup.items;
    };

    /**
     * Item enabled
     * @param {string} id 
     * @param {bool} enabled 
     */
    CollectionControl.prototype.enabled = function (id, enabled = true) {
        if (typeof _items[id].item.disabled != 'undefined') {
            _items[id].item.disabled = !enabled;
        }
    };

    /**
     * Group enabled
     * @param {string} groupName 
     * @param {bool} enabled 
     */
    CollectionControl.prototype.groupEnabled = function (groupName, enabled = true) {
        let result = this.group(groupName);
        for (const key in result) {
            if (result.hasOwnProperty(key)) {
                this.enabled(key, enabled);
            }
        }
    };

    return CollectionControl;
})();

export { CollectionControl };
