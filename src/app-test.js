


// import { MDCButton_Syg } from "./../components/button/component";
import { MDCTextField } from "@material/textfield";
import { MDCTextFieldSyg } from "../components/textfield/component";
// import { MDCRipple } from '@material/ripple';
// import { MDCSegmentedButton } from '@material/segmented-button';
// import { MDCSnackbar } from '@material/snackbar';
// import { MDCLinearProgress } from '@material/linear-progress';
// import { MDCMenuSurface } from '@material/menu-surface';
import { MDCMenu } from '@material/menu';
import { MDCList } from '@material/list';
// import { MDCRadio } from '@material/radio';
// import { MDCFormField } from '@material/form-field';
// import { MDCIconButtonToggle} from '@material/icon-button';
// import { MDCList } from './../components/list/component';
// import { MDCDrawer } from '@material/drawer';
import { MDCSelect } from '@material/select';
import { MDCDataTable } from '@material/data-table';
import { MDCFloatingLabel } from '@material/floating-label';
import { MDCSelectHelperText } from '@material/select/helper-text';

// import { CollectionControl } from './../components/collection-control/component';

// let cmp = new CollectionControl();

// let cmp1 = cmp.add('locale-menu', 'menu', { "keys": ["en-EN"] });
// // let cmp1 = cmp.add('textfield-sample', 'textField', {'trailingIcon.parent.trailingIcon.replaceIcon': 'phone'});
// cmp1.root.addEventListener('MDCMenu:selected', (event) => {
//     console.log(cmp1.key)
// });
// console.log(cmp1);

var cntr = [];

function init(classCss, classComponent, func) {
    cntr = [].map.call(document.querySelectorAll(classCss), function (el1) {
        let control = new classComponent(el1);
        control.required = true;
        // control.helperText.foundation.setValidationMsgPersistent(false);
        // control.helperText.foundation.setContent('error');                
        // control.helperText.foundation.setValidation(true);
        // control.helperText_.foundation.setValidity(true);
        // control.required = true;
        // control.leadingIconAriaLabel = 'clear';
        // control.leadingIconContent = 'clear';
        // control.foundation.leadingIcon = 'clear';
        // control.listen('MDCSelect:change', (event) => {
        //     console.log(event);
        //     // control.value = 23;
        // });
        // control.open = true;
        // control.listen('MDCSelect:change', () => {
        //     alert(`Selected option at index ${control.selectedIndex} with value "${control.value}"`);
        // });
        // control.keys = [12,54,78];
        // control.trailingIcon.click(function() {
        //     console.log(this);
        // }, control.trailingIcon);
        // control.key = 45;
        // control.required = true;
        // control.helperMessage.error = 'error';
        // control.helperMessage.info = 'info';        
        // control.helperMessage.ex.tooLong = 'valueMissing';

        // control.trailingIcon.clear = true;
        // control.trailingIcon.replaceIcon = 'phone';        

        console.log(control);        
        return control;
    });
}

// init('.mdc-floating-label', MDCFloatingLabel);
// init('.mdc-select', MDCSelect);
// init('.mdc-select-helper-text', MDCSelectHelperText);
// init('.mdc-data-table', MDCDataTable);
// init('.mdc-drawer', MDCDrawer);
// init('.mdc-radio', MDCRadio);
// init('.mdc-circular-progress', MDCCircularProgress);
// init('.mdc-list', MDCList);
// init('.mdc-icon-button', MDCIconButtonToggle);
// init('.mdc-menu', MDCMenu);
// init('.mdc-linear-progress', MDCLinearProgress);
// init(".mdc-text-field", MDCTextField);
init(".mdc-text-field", MDCTextFieldSyg);
// init('.mdc-segmented-button', MDCSegmentedButton);
// init('.mdc-snackbar', MDCSnackbar);

$('#button').click(function () {
    cntr[0].helperMessage.error = 'qwe';
})

// $('#add-to-favorites-dop').click(function() {
//     cntr[0].labelText = 'asdasdsdfjsldjflskdjflks jlk jlksjlk jsdlkjsdlkj h kh kjh kjh kjhj hkj hk  kh kh kj hkj hk jhk h kj';
//     // cntr[0].close('dismiss');
// })

