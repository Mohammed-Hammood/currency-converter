import {useState, useEffect } from 'react';
import {CurrenciesOptions} from "./containers.js";
import { getCurrencies, getDefaultCurrency, createCurrencies } from "./localStorage";
import style from "../styling/defaultCurrency.module.css";

export default function AllCurrencies(){
    const [defaultCurrency, setDefaultCurrency] = useState(getDefaultCurrency());
    const [data, setData] = useState([]);
    const handleSelection = () => {
        const sel = document.getElementById("select-id");
        const selectedCurrency = sel.options[sel.selectedIndex].value;
        localStorage.setItem('defaultCurrency', selectedCurrency);
        setDefaultCurrency(selectedCurrency);
    };
    
    useEffect(() => {
        CurrenciesOptions("select-id");
        document.getElementById("select-id").value = defaultCurrency;
        const currencies = getCurrencies(defaultCurrency);
        if(currencies.length === 0){
            const apiKey = "02de6af0-4b95-11ec-a469-513b9be9dc96"; 
            const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${defaultCurrency}`; 
            fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            .then(res => res.json())
            .then(data => {createCurrencies(data.data, defaultCurrency); setData(getCurrencies(defaultCurrency))})
            .catch(error => console.log("Error: ", error));
        }
    }, [defaultCurrency]);
    return (<div className={style.mainContainer}>
        <div className={style.defaultCurrencyContainer}>
            <div className={style.HeaderContainer}>
                <span className={style.leftSpan}>Default Currency </span>
                <select className={style.Select} id="select-id" onChange={()=>handleSelection()}></select>
            </div>
            <div className={style.currenciesContainer} id='container-curr'>
                {  getCurrencies(defaultCurrency).map((item, index) => {
                    return (
                            <div className={style.currencies} id="" key={index}>
                                <span className={style.firstSpan}>{item.code }</span>
                                <span className={style.secondSpan}>{item.value }</span>
                            </div>
                    )
                    })}
            </div>
        </div>
    </div>
    );
}