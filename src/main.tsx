import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {BrowserRouter} from "react-router-dom";
import {ProjectRouterComponent} from "./components/router/ProjectRouter.component";

const root =  ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <BrowserRouter>
        <ProjectRouterComponent />
    </BrowserRouter>
)
