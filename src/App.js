import NavBar from "./components/navBar";
import {Routes, Route} from "react-router-dom";
import Home from "./components/page-1";
import AllCurrencies from "./components/page-2";
import "./components/css/main.scss";

function App(){
    return (<div>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/currencies" element={<AllCurrencies />} />
        </Routes>
    </div>)
}

export default App;