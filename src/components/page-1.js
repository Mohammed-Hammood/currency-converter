import {useState, useEffect} from 'react';
import {CurrenciesOptions} from "./containers.js";
import {getCurrencies, getSelectedCurrency, setSelectedCurrency, createCurrencies} from './localStorage';

export default function Home(){
    const [fromCurrencyValue, setFromCurrencyValue] = useState(1);
    const [currencyExchangeRate, setCurrencyExchangeRate] = useState(null);
    const [toCurrency, setToCurrency] = useState(getSelectedCurrency('to'));
    const [fromCurrency, setFromCurrency] = useState(getSelectedCurrency('from'));
   
    useEffect(()=>{
       /*go to https://freecurrencyapi.net/ and get your api key for free 
        and paste it inside apiKey. */
        const apiKey = "02de6af0-4b95-11ec-a469-513b9be9dc96"; 
        CurrenciesOptions("to-select");
        CurrenciesOptions("from-select");
        document.getElementById("from-select").value = fromCurrency;
        document.getElementById("to-select").value = toCurrency;
        // const url_ = `https://api.currencyapi.com/v3/latest?apikey=02de6af0-4b95-11ec-a469-513b9be9dc96`;
        const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${fromCurrency}`;
        // const url = `https://freecurrencyapi.net/api/v2/latest?apikey=${apiKey}&base_currency=${fromCurrencyValue}`;
        const currencies = getCurrencies(fromCurrency);
        if(currencies.length === 0){ 
            fetch(url, {
                method:'GET',
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then((res) => res.json())
            .then(data => {createCurrencies(data.data, fromCurrency); setCurrencyExchangeRate(toExchangeRate())})
            .catch((error) => console.log("Error: " , error));
        }
        handleSelection();

    }, [toCurrency, fromCurrency]);
    const handleSelection = () => {
        const fromSelect = document.getElementById("from-select");
        const fromCurrency = fromSelect.options[fromSelect.selectedIndex].value;
        const toSelect = document.getElementById("to-select");
        const toCurrency = toSelect.options[toSelect.selectedIndex].value;
            setFromCurrency(fromCurrency);
            setToCurrency(toCurrency);        
            setSelectedCurrency('to', toCurrency);
            setSelectedCurrency('from', fromCurrency);
    }
    const toExchangeRate = ()=> {
        const currencyExchangeRate = getCurrencies(fromCurrency);
        for(let i = 0; i < currencyExchangeRate.length; i++){
            if(currencyExchangeRate[i].code === toCurrency && parseInt(fromCurrencyValue) >= 0){
                return  currencyExchangeRate[i].value * fromCurrencyValue;
            }
        }
        return null;
    }
  
    const handleInputChanges = (event)=> {
        const number = event.target.value;
        if(number>= 0){
            setFromCurrencyValue(number);
        }else {
            setFromCurrencyValue(null);
            setCurrencyExchangeRate(null);
        }
    }
    return (<div className="home-container"> 
        <div className="main-content-container">
         
            <div className="results-container">
                <div className="results-title">
                    <span>{fromCurrency}</span>
                    <span>{toCurrency}</span>
                </div>
                <div className="results-currencies">
                    <div className='from-currency' id='from-currency-display'>{fromCurrencyValue}</div>
                    <div className='to-currency'>{toExchangeRate()}</div>
                </div>
            </div>
            <div className="form-container">
                    <input type="number" value={fromCurrencyValue} id="input-number" onInput={(event)=>handleInputChanges(event)} />
                    <div className="selections">
                        <div id="from">
                            <span>From</span>
                            <select id="from-select" onChange={() => handleSelection()} ></select>
                        </div>
                        <div id="to">
                            <span>To</span>
                            <select id="to-select" onChange={() => handleSelection()}></select>
                        </div>
                    </div>
            </div>
        </div>
    </div>)
}