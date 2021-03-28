import { MDCList } from '@material/list/component';

class TCollapse extends MDCList {
    constructor(root: Element, ...args: any[]) {
        super(root, ...args);
        this.listElements.forEach((element: Element) => {
            element.addEventListener('click', () => {
                let id: string | null = element.getAttribute('id');
                if (id) {
                    id += '_c';
                    let content: Element | null = (element.parentElement as HTMLElement).querySelector(
                        `#${id}`
                    );
                    if (content) {
                        element.classList.toggle('mdc-collapse__header-active');
                        let cls1 = 'mdc-collapse__content-open';
                        let cls2 = 'mdc-collapse__content-activated';
                        if (this.isOpen(content)) {
                            cls1 = 'mdc-collapse__content-activated';
                            cls2 = 'mdc-collapse__content-open';
                        }                                                
                        this.setClassByTimeout(content, cls2);
                        content.classList.toggle(cls1);
                    }
                }
            });
        });
    }

    private setClassByTimeout(
        element: Element,
        cssClassName: string        
    ): void {
        let timeOut = this.isOpen(element) ? 100 : 0;
        setTimeout(() => {
            element.classList.toggle(cssClassName);
        }, timeOut);
    }

    isOpen(element: Element): boolean {
        return element.classList.contains('mdc-collapse__content-open');
    }
}

export { TCollapse };
