declare type TStringUn = string | undefined;
declare type TStringUnAr = TStringUn | string[];
declare class Types {
    static defValue(val: any, defaultVal: any): any;
}
export { TStringUn, TStringUnAr, Types };
