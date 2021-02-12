import { MDCIconButtonToggle } from '@material/icon-button/component';

class TIconButtonSyg extends MDCIconButtonToggle{    
    /**
     * Button disabled or enabled
     */
    get disabled(): boolean {
        return this.root.hasAttribute('disabled');
    }

    set disabled(value: boolean) {
        if (this.disabled !== value) {
            if (value) {
                this.root.setAttribute('disabled', 'disabled');
            } else {
                this.root.removeAttribute('disabled');
            }
        }
    }
}

export { TIconButtonSyg };
