import React from 'react';
import TopBar from './components/topbar/topbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/home/home";
import Info from "./components/info";


const App: React.FC = () => {
    return (
        
        <BrowserRouter>
            <TopBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/info" element={<Info/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
