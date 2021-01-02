class Safe {
    contents: string;

    constructor(contents: string) {
        this.contents = contents;
    }

    printContents() {
        console.log(this.contents);
    }
}

const safe = new Safe('Crown Jewels');
safe.printContents();
