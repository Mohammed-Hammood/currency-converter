import {useState, useEffect } from "react";
import style from "./css/defaultCurrency.module.css";
import {DefaultValues} from './containers.js';

function CurrenciesElements(defaultCurrency){
    const [exchangeRates, setExchangeRates] = useState();
    let content = ``;
    //go to https://freecurrencyapi.net/ and get your api key for free and paste it inside apiKey.
    const apiKey = ""; 
    const [DefaultCurrency, fromCurrency, toCurrency] = DefaultValues("", "", "");
    const url = `https://freecurrencyapi.net/api/v2/latest?apikey=${apiKey}&base_currency=${DefaultCurrency}`;
    
    const rendering = (data)=>{        
        const container = document.getElementById("currenciesContainer");
        const requiredCurrencies = {'USD':"United States Dollar", 'EUR':"Euro"};
        for(let [key, value] of Object.entries(requiredCurrencies)){
            content += `<div class="${style.currencies}" id=""><span class="${style.firstSpan}">${value}</span>
                        <span class="${style.secondSpan}">${data[key]}</span></div>`;
            }
            container.innerHTML = content;
    }
    
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {rendering(data.data); setExchangeRates(data.data)})
        .catch(error => console.log("Error: ", error));
    }, [defaultCurrency]);
    return (<div className={style.currenciesContainer} id="currenciesContainer"></div>);
};

export default CurrenciesElements;