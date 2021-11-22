import style from "./css/defaultCurrency.module.css";
import {useState, useEffect } from 'react';
import {DefaultValues, CurrenciesOptions} from "./containers.js";
import CurrenciesElements from "./currencies.js";

function AllCurrencies(){
    const [defaultCurrency, setDefaultCurrency] = useState("");
    const handleSelection = () => {
        const sel = document.getElementById("select-id");
        const selectedCurrency = sel.options[sel.selectedIndex].value;
        setDefaultCurrency(selectedCurrency);
        DefaultValues(selectedCurrency, "", "");
    };
    useEffect(()=>{
        CurrenciesOptions("select-id");
       const [defaultCurrency, ...rest ] =  DefaultValues("", "", "");
       document.getElementById("select-id").value = defaultCurrency;
    },
    [defaultCurrency]);
   
    return (<div className={style.mainContainer}>
        <div className={style.defaultCurrencyContainer}>
            <div className={style.HeaderContainer}>
                <span className={style.leftSpan}>Default Currency </span>
                <select className={style.Select} id="select-id" onChange={()=>handleSelection()}></select>
            </div>
            <CurrenciesElements change={defaultCurrency}/>
        </div>
    </div>
    );
}

export default AllCurrencies;