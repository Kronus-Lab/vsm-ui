import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Home from "./components/Home";
import './App.css'



function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );

}

export default App
