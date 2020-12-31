
// import { MDCButton_Syg } from "./../components/button/component";
// import { MDCTextField } from "@material/textfield";
import { MDCTextField_Syg } from "./../components/textfield/component";
// import { MDCRipple } from '@material/ripple';
// import { MDCSegmentedButton } from '@material/segmented-button';
// import { MDCSnackbar } from '@material/snackbar';
// import { MDCLinearProgress } from '@material/linear-progress';
// import { MDCMenuSurface } from '@material/menu-surface';
// import { MDCMenu } from '@material/menu';
// import { MDCList } from '@material/list';
// import { MDCRadio } from '@material/radio';
// import { MDCFormField } from '@material/form-field';
// import { MDCIconButtonToggle} from '@material/icon-button';
// import { MDCList } from './../components/list/component.js';
// import { MDCDrawer } from '@material/drawer';



var cntr = [];

function init(classCss, classComponent, func) {
    cntr = [].map.call(document.querySelectorAll(classCss), function (el1) {
        let control = new classComponent(el1);
        console.log(control);
        control.open = true;

        return control;
    });
}

// init('.mdc-drawer', MDCDrawer);
// init('.mdc-radio', MDCRadio);
// init('.mdc-circular-progress', MDCCircularProgress);
// init('.mdc-list', MDCList);
// init('.mdc-icon-button', MDCIconButtonToggle);
// init('.mdc-menu', MDCMenu);
// init('.mdc-linear-progress', MDCLinearProgress);
// init('.mdc-button', MDCButton_Syg);
// init(".mdc-text-field", MDCTextField);
init(".mdc-text-field", MDCTextField_Syg);
// init('.mdc-segmented-button', MDCSegmentedButton);
// init('.mdc-snackbar', MDCSnackbar);

$('#add-to-favorites').click(function () {
    cntr[1].open = true;
    // cntr[0].list_.selectedIndex = 0;
    // cntr[0].foundation.setSelectedIndex(1);
})

// $('#add-to-favorites-dop').click(function() {
//     cntr[0].labelText = 'asdasdsdfjsldjflskdjflks jlk jlksjlk jsdlkjsdlkj h kh kjh kjh kjhj hkj hk  kh kh kj hkj hk jhk h kj';
//     // cntr[0].close('dismiss');
// })
