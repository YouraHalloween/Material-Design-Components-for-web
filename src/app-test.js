


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
import { ChunkGraph } from "webpack";

// import { CollectionControl } from './../components/collection-control/component';

// let cmp = new CollectionControl();

// let cmp1 = cmp.add('locale-menu', 'menu', { "keys": ["en-EN"] });
// let cmp1 = cmp.add('textfield-sample', 'textField', {'trailingIcon.parent.trailingIcon.replaceIcon': 'phone'});
// cmp1.root.addEventListener('MDCMenu:selected', (event) => {
//     console.log(cmp1.key)
// });
// console.log(cmp1);

var cntr = [];

function init(classCss, classComponent, func) {
    cntr = [].map.call(document.querySelectorAll(classCss), function (el1) {
        let control = new classComponent(el1);     
        console.log(control);        
        return control;
    });
}

// init('.mdc-floating-label', MDCFloatingLabel);
// init('.mdc-select', MDCSelect);
// init('.mdc-select-helper-text', MDCSelectHelperText);
init('.mdc-data-table', MDCDataTable);
// init('.mdc-drawer', MDCDrawer);
// init('.mdc-radio', MDCRadio);
// init('.mdc-circular-progress', MDCCircularProgress);
// init('.mdc-list', MDCList);
// init('.mdc-icon-button', MDCIconButtonToggle);
// init('.mdc-menu', MDCMenu);
// init('.mdc-linear-progress', MDCLinearProgress);
// init(".mdc-text-field", MDCTextField);
// init(".mdc-text-field", MDCTextFieldSyg);
// init('.mdc-segmented-button', MDCSegmentedButton);
// init('.mdc-snackbar', MDCSnackbar);

$('#button').click(function () {
    // console.log(cntr[0].foundation.getSelectedRowIds());
});