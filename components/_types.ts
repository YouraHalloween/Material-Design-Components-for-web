type TUnString = string | undefined;
// type TEventCallBack = (event?: Event) => void;

class Types {
    static defValue(val: any, defaultVal: any) {
        return typeof val === 'undefined' ? defaultVal : val;
    }
}

export { 
    TUnString,
    // TEventCallBack, 
    Types 
};
