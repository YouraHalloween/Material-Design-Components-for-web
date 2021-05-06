import { MDCList } from './mdc-list-collapse';
import { cssClasses } from '@material/list/constants';
import { MDCListActionEvent } from '@material/list/types';

interface IIcons {
    [key: number]: string;
}

class TCollapseSyg extends MDCList {
    private icons: IIcons = {
        1: 'unfold_more',
        0: 'unfold_less',
    };

    static attachTo(root: HTMLElement) {
        return new TCollapseSyg(root);
    }

    constructor(root: Element, ...args: any[]) {
        super(root, ...args);
        this.singleSelection = false;
        this.listen('MDCList:action', (({
            detail,
        }: MDCListActionEvent) => {
            this.expand(detail.index);
        }) as EventListener);
    }

    expand(index: number): void {
        const element: Element = this.listElements[index];
        const idContent: string | null = element.getAttribute('aria-controls');
        if (idContent) {
            const content: Element | null = (element.parentElement as HTMLElement).querySelector(
                `#${idContent}`
            );
            if (content) {
                element.classList.toggle('mdc-collapse__header-active');

                let cls1 = 'mdc-collapse__content-open';
                let cls2 = 'mdc-collapse__content-activated';
                const open = this.isOpen(content);
                if (open) {
                    cls1 = 'mdc-collapse__content-activated';
                    cls2 = 'mdc-collapse__content-open';
                    element.setAttribute('aria-selected', 'false');
                    element.setAttribute('aria-expanded', 'false');
                } else {
                    element.setAttribute('aria-selected', 'true');
                    element.setAttribute('aria-expanded', 'true');
                }
                this.setClassByTimeout(content, cls2);
                content.classList.toggle(cls1);

                const icon: Element | null = element.querySelector(
                    '.mdc-list-item__graphic'
                );
                (icon as Element).innerHTML = this.icons[Number(open)];
            }
        }
    }

    private setClassByTimeout(element: Element, cssClassName: string): void {
        const timeOut = this.isOpen(element) ? 150 : 0;
        setTimeout(() => {
            element.classList.toggle(cssClassName);
        }, timeOut);
    }

    layout() {
        this.classNameMapForce[cssClasses.LIST_ITEM_CLASS] =
            cssClasses.LIST_ITEM_CLASS + '__collapse';
        super.layout();
    }

    isOpen(element: Element): boolean {
        return element.classList.contains('mdc-collapse__content-open');
    }
}

export { TCollapseSyg };
