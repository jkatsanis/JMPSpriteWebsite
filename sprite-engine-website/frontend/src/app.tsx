import React, { useEffect, useState } from 'react';
import TopBar from 'components/topbar/topbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from 'components/home/home';
import Info from 'components/info';
import Docu from 'components/docs/documentation';
import { Threads } from 'components/threads/threads';
import { ThreadPage } from 'components/threads/ui/page-question/page-question';
import { AddQuestionModal } from 'components/threads/ui/new-question/new-question';
import ProjectsDisplay from "./components/projects/projectsDisplay";
import Login from "./components/login/login";
import Callback from "./components/callback/callback";
import { accountRepo } from 'components/threads/logic/account-repository';
import { threadRepo } from 'components/threads/logic/thread-repository';

const App: React.FC = () => {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initRepos = async () => {
            await threadRepo.initialize(accountRepo);

            setIsInitialized(true);
        };

        initRepos();
    }, []);

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/info" element={<Info />} />
                <Route path="/docu" element={<Docu />} />
                <Route path="/projects" element={<ProjectsDisplay />} />
                <Route path="/threads" element={<Threads />} />
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/threads/:id" element={<ThreadPage />} />
                <Route path="/threads/new" element={<AddQuestionModal />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
