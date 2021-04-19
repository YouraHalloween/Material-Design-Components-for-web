interface ISpinnerSize {
    extra_small: string;
    small: string;
    medium: string;
    large: string;
}

type TSpinnerSizeProperty = keyof ISpinnerSize;
class TSpinnerSyg {
    private _size: ISpinnerSize = {
        extra_small: 'mdc-spinner-extra-small',
        small: 'mdc-spinner-small',
        medium: 'mdc-spinner-medium',
        large: 'mdc-spinner-large',
    };
    private _delayVisible: number = 50;
    private _delayHidden: number = 170;

    public root: Element;

    /**
     * attach to class
     * @param root Node
     */
    static attachTo(root: Element) {
        return new TSpinnerSyg(root);
    }

    constructor(root: Element) {
        this.root = root;
    }

    /**
     * Size spinner
     */
    get size(): TSpinnerSizeProperty {
        let key: TSpinnerSizeProperty = 'medium';
        // tslint:disable-next-line: forin
        for (key in this._size) {
            const cls: string = this._size[key];
            if (this.root.classList.contains(cls)) {
                return key;
            }
        }
        return key;
    }
    set size(value: TSpinnerSizeProperty) {
        let key: TSpinnerSizeProperty;
        // tslint:disable-next-line: forin
        for (key in this._size) {
            this.root.classList.remove(this._size[key]);
        }
        this.root.classList.add(this._size[value]);
    }

    /**
     * delay after Display: Block, for animation
     */
    get delayVisible(): number {
        return this._delayVisible;
    }
    set delayVisible(value: number) {
        this._delayVisible = value;
    }

    /**
     * Delay after animation, for display: none
     */
    get delayHidden(): number {
        return this._delayHidden;
    }
    set delayHidden(value: number) {
        this._delayHidden = value;
    }

    /**
     * is show spinner
     */
    isShow(): boolean {
        return this.root.classList.contains('mdc-spinner--show');
    }

    /**
     * show spinner
     */
    show(): void {
        this.root.classList.add('mdc-spinner--show');
        setTimeout(() => {
            this.root.classList.add('mdc-spinner--show__visible');
        }, this._delayVisible);
    }

    /**
     * unvis spinner
     */
    close() {
        this.root.classList.remove('mdc-spinner--show__visible');
        setTimeout(() => {
            this.root.classList.remove('mdc-spinner--show');
        }, this._delayHidden);
    }

    /**
     * show < - > unvis spinner
     */
    toggle() {
        if (this.isShow()) {
            this.close();
        } else {
            this.show();
        }
    }
}

export { TSpinnerSyg };
