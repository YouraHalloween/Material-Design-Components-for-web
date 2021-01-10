type TUnString = string | undefined;

class Types {
    static defValue(val: any, defaultVal: any) {
        return typeof val === 'undefined' ? defaultVal : val;
    }
}

export { TUnString, Types };
