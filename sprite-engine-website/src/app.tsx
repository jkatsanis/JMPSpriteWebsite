import React from 'react';
import TopBar from './components/topbar/topbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/home/home";
import Info from "./components/info";
import Docu from "./components/docs/documentation"
import { Threads } from 'components/threads/threads';
import { ThreadPage } from 'components/threads/question';

const App: React.FC = () => {
    return (      
        <BrowserRouter>
            <TopBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/info" element={<Info/>}/>
                <Route path="/docu" element={<Docu/>}/>
                <Route path="/docu" element={<Docu/>}/>
                <Route path="/threads" element={<Threads/>}/>
                <Route path="/threads/:id" element={<ThreadPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
