import React, { useEffect, useState } from 'react';
import TopBar from 'frontend/components/topbar/topbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from 'frontend/components/home/home';
import Info from 'frontend/components/info';
import Docu from 'frontend/components/docs/documentation';
import { Threads } from 'frontend/components/threads/threads';
import { ThreadPage } from 'frontend/components/threads/ui/page-question/page-question';
import { AddQuestionModal } from 'frontend/components/threads/ui/new-question/new-question';
import ProjectsDisplay from "./frontend/components/projects/projectsDisplay";
import Login from "./frontend/components/login/login";
import Callback from "./frontend/components/callback/callback";
import { accountRepo } from 'frontend/components/threads/logic/account-repository';
import { threadRepo } from 'frontend/components/threads/logic/thread-repository';

const App: React.FC = () => {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initRepos = async () => {
            await accountRepo.init();
            await threadRepo.initialize();

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
