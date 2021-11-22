import {useState, useEffect} from 'react';
import {CurrenciesOptions, DefaultValues} from "./containers.js";

function Home(){
    const [currency, setCurrency] = useState(0);
    const [currencyExchangeRate, setCurrencyExchangeRate] = useState(0);
    const [toCurrenyText, setToCurrencyText] = useState("");
    const [fromCurrenyText, setFromCurrencyText] = useState("");

    useEffect(()=>{
       /*go to https://freecurrencyapi.net/ and get your api key for free 
        and paste it inside apiKey. */
        const apiKey = ""; 
        CurrenciesOptions("to-select");
        CurrenciesOptions("from-select");
        const [defaultCurrency, fromCurrencyValue, toCurrencyValue ] =  DefaultValues("", "", "");
        document.getElementById("from-select").value = fromCurrencyValue;
        document.getElementById("to-select").value = toCurrencyValue;
        handleSelection();
        const url = `https://freecurrencyapi.net/api/v2/latest?apikey=${apiKey}&base_currency=${fromCurrencyValue}`;
        
        fetch(url)
        .then((res) => res.json())
        .then( (data)=> {setCurrencyExchangeRate(data.data[toCurrencyValue] ) })
        .catch((error) => console.log("Error: " , error));

    }, [currency, toCurrenyText, fromCurrenyText]);
    const handleSelection = () => {
        const fromSelect = document.getElementById("from-select");
        const fromCurrency = fromSelect.options[fromSelect.selectedIndex];
        const toSelect = document.getElementById("to-select");
        const toCurrency = toSelect.options[toSelect.selectedIndex];
            setFromCurrencyText(fromCurrency.text);
            setToCurrencyText(toCurrency.text);        
            DefaultValues("", fromCurrency.value, toCurrency.value);
    }
    const CurrencyCalculation =()=>{
        if(currency!= NaN && currency != undefined && currencyExchangeRate != NaN && currencyExchangeRate != undefined){
            return (currency * currencyExchangeRate);}
        return 0;
    }

    return (<div className="home-container"> 
        <div className="main-content-container">
            <div className="results-container">
                <div className="results-title">
                    <span>{fromCurrenyText}</span>
                    <span>{toCurrenyText}</span>
                </div>
                <div className="results-currencies">
                    <div>{currency }</div>
                    <div>{CurrencyCalculation()}</div>
                </div>
            </div>
            <div className="form-container">
                    <input type="number" value={currency} id="input-number" onInput={(event)=>setCurrency(event.target.value)} />
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

export default Home;