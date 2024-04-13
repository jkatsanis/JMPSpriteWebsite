import React from 'react';
import TopBar from 'frontend/components/topbar/topbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from 'frontend/components/home/home';
import Info from 'frontend/components/info';
import Docu from 'frontend/components/docs/documentation';
import { Threads } from 'frontend/components/threads/threads';
import { ThreadPage } from 'frontend/components/threads/ui/page-question';
import { AddQuestionModal } from 'frontend/components/threads/ui/new-question/new-question';

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
                <Route path='/threads/new' element={<AddQuestionModal/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
