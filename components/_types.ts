type TStringUn = string | undefined;
type TStringUnAr = TStringUn | string[];

class Types {
    static defValue(val: any, defaultVal: any) {
        return typeof val === 'undefined' ? defaultVal : val;
    }
}

export { 
    TStringUn,
    TStringUnAr,
    Types 
};
