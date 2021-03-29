import { MDCList } from '@material/list/component';

interface IIcons {
    [key: number]: string;
}

class TCollapseSyg extends MDCList {
    private icons: IIcons = {
        1: 'unfold_more',
        0: 'unfold_less',
    };

    constructor(root: Element, ...args: any[]) {
        super(root, ...args);
        this.listElements.forEach((element: Element) => {
            element.addEventListener('click', () => {
                let id: string | null = element.getAttribute('id');
                if (id) {
                    id += '_c';
                    const content: Element | null = (element.parentElement as HTMLElement).querySelector(
                        `#${id}`
                    );
                    if (content) {
                        element.classList.toggle('mdc-collapse__header-active');

                        let cls1 = 'mdc-collapse__content-open';
                        let cls2 = 'mdc-collapse__content-activated';
                        const open = this.isOpen(content);
                        if (open) {
                            cls1 = 'mdc-collapse__content-activated';
                            cls2 = 'mdc-collapse__content-open';
                        }
                        this.setClassByTimeout(content, cls2);
                        content.classList.toggle(cls1);

                        const icon: Element | null = element.querySelector(
                            '.mdc-list-item__graphic'
                        );
                        (icon as Element).innerHTML = this.icons[Number(open)];
                    }
                }
            });
        });
    }

    private setClassByTimeout(element: Element, cssClassName: string): void {
        const timeOut = this.isOpen(element) ? 150 : 0;
        setTimeout(() => {
            element.classList.toggle(cssClassName);
        }, timeOut);
    }

    isOpen(element: Element): boolean {
        return element.classList.contains('mdc-collapse__content-open');
    }
}

export { TCollapseSyg };
