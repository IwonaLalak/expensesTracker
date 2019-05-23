import acc from "accounting-js";

export default {
    format(amount){
        return acc.formatMoney(amount,{ symbol: "zł", precision: 2, thousand: ".", decimal: "," , format: "%v %s"})
    }
}