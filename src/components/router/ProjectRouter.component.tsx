import React, {FC} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {Home} from "../../pages/home/home";
import {NewNote} from "../note/NewNote.component";
import {HOME_ROUTE, NEW_NOTE_ROUTE} from "../../utils/routes";

interface IRoute {
    element: React.ReactNode,
    path: string,
}

export const ProjectRouterComponent: FC = () => {

    const routes: IRoute[] = [
        {
            element: <Home />,
            path: HOME_ROUTE,
        },
        {
            element: <NewNote />,
            path: NEW_NOTE_ROUTE,
        },
        {
            element: <Navigate to={'/'} replace />,
            path: '*',
        },
    ]

    return (
        <Routes>
            <Route path={'/:id'}>
                <Route index element={<h1>Element</h1>} />
                <Route path='edit' element={<h2>Edit</h2>}/>
            </Route>
            {routes.map((route, index) => <Route key={index} path={route.path} element={route.element}/>)}
        </Routes>
    );
};

