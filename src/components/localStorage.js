import {CurrenciesObject} from './containers';

const limitedTime = 360000; //3600 seconds which is one hour and then stored currency in the localstorage should be updated.
export const convertObjectToArray = (object)=> {
    let array = [];
    Object.entries(object).forEach((item, index)=> {
        array.push({
            code:item[1].code,
            value:item[1].value
        });
    });
    return array;
}
export const createCurrencies = (data, defaultCurrency)=> {
    let CURRENCY = {
        currency:defaultCurrency,
        lastUpdated: new Date(),
        data:convertObjectToArray(data)
        };
    if(localStorage.getItem('currencies') === null){
        let currencies = [];
        currencies.push(CURRENCY);
        localStorage.setItem('currencies', JSON.stringify(currencies));
    }else{
        const currencies = JSON.parse(localStorage.getItem('currencies'));
        let requiredUpdate = false;
        let currencyFound = false;
        let currencyIndex = 0; 
        for(let i = 0; i < currencies.length; i++){
            if(currencies[i].currency === defaultCurrency){
                //1. check if the current currency is stored in localSorage 
                //and also check for last update. if last updated less than one hour, then return currency
                //if the last updated more than one hour, then return null, so that it should be updated.
                //2. if currency not found in localStorage, then add it to localStorage.
                currencyFound = true;
                const timeFromLastUpdate = (new Date() -  new Date(currencies[i].lastUpdated))/1000;
                if( timeFromLastUpdate > limitedTime ){
                    requiredUpdate = true;
                    currencyIndex = i;
                }
            }
        }
        if(requiredUpdate){
            currencies[currencyIndex] = CURRENCY;
            localStorage.setItem('currencies', JSON.stringify(currencies));
        }else if (!currencyFound){
            currencies.push(CURRENCY);
            localStorage.setItem('currencies', JSON.stringify(currencies));
        }
    }
}

export const getCurrencies = (defaultCurrency, ref=null)=> {
    if(localStorage.getItem('currencies') === null){
        return [];
    }else{
        const currencies = JSON.parse(localStorage.getItem('currencies'));
        for(let i = 0; i < currencies.length; i++){
         const timeFromLastUpdate = (new Date() -  new Date(currencies[i].lastUpdated))/1000;
            if(currencies[i].currency === defaultCurrency  && timeFromLastUpdate < limitedTime){
                return currencies[i].data;
            }
        }
        return [];
    }
}
export const getDefaultCurrency = ()=> { 
    const defaultCurrency = localStorage.getItem('defaultCurrency');
    if(defaultCurrency === null){
        localStorage.setItem('defaultCurrency', 'USD');
        return 'USD';
    }else {
        return defaultCurrency;
    }
}
export const getSelectedCurrency = (selected)=> {
    if(selected === 'to'){
        const toCurrency =  localStorage.getItem("toCurrency");
        if(toCurrency && Object.keys(CurrenciesObject).includes(toCurrency)){return toCurrency;}
        localStorage.setItem('toCurrency', 'EUR');
        return 'EUR';
    }else if(selected === 'from'){
        const fromCurrency =  localStorage.getItem("fromCurrency");
        if(fromCurrency && Object.keys(CurrenciesObject).includes(fromCurrency)){
            return fromCurrency;
        }
        localStorage.setItem('fromCurrency', 'USD');
        return 'USD';
    }
    return null;
}
export const setSelectedCurrency = (selected, currency)=> {
    const checkExistance = Object.keys(CurrenciesObject).includes(currency); 
    if(selected === 'to' && checkExistance){
        localStorage.setItem("toCurrency", currency);
    }else if(selected === 'from' && checkExistance){
            localStorage.setItem("fromCurrency", currency);
    }
}