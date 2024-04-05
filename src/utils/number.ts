export function addSign(number: number):string {
    if(number>0){
        return "+" + number.toLocaleString();
    }
    return number.toLocaleString();
}