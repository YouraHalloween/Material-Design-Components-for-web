import { MDCList } from '@material/list/component';
import { MDCDrawerSyg } from '../drawer/component';
import { MDCListActionEvent } from '@material/list/types';

class TLeftAppBarSyg extends MDCList {
    static attachTo(root: Element): TLeftAppBarSyg {
        return new TLeftAppBarSyg(root);
    }

    constructor(root: Element, ...args: any[]) {
        super(root, ...args);
        this.singleSelection = true;
    }

    isAll(index: number = -1): boolean {
        if (index === -1) {
            for (let index = 0; index < this.listElements.length; index++) {
                const element: Element = this.listElements[index];
                if (element.classList.contains('mdc-left-app-bar-item__all')) {
                    return true;
                }
            }
            return false;
        } else {
            return this.listElements[index].classList.contains(
                'mdc-left-app-bar-item__all'
            );
        }
    }

    attachDrawer(drawer: MDCDrawerSyg): void {
        this.listen('MDCList:action', (event: MDCListActionEvent) => {
            let index = event.detail.index;

            if (this.isAll(index)) {
                index = -1;
            } else {
                index = this.isAll() ? index - 1 : index;
            }

            if (index === drawer.getActiveGroupIndex()) {
                drawer.open = !drawer.open;
            } else {
                if (!drawer.open) {
                    drawer.open = true;
                }
            }

            drawer.renderActive(index);
        });
    }
}

export { TLeftAppBarSyg };
