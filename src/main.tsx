import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {BrowserRouter} from "react-router-dom";
import {ProjectRouterComponent} from "./components/router/ProjectRouter.component";
import {create} from 'zustand'
import {IPost} from "./pages/home/home";
import {persist, createJSONStorage} from "zustand/middleware";
const root =  ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

export interface TodoState {
    posts: IPost[];
    setPosts: (state: IPost[]) => void;
}

const storeOptions = (storageName: string) => {
    return {
        name: storageName,
        storage: createJSONStorage(() => localStorage)
    }
}

export const usePostsStore = create<TodoState>()
(
    persist((set) => (
        {
            posts: [],
            setPosts: (newValue: IPost[]) => set(() => ({
                posts: newValue
            }))
        }),
        storeOptions('post-storage')
    )
)

root.render(
    <BrowserRouter>
        <ProjectRouterComponent />
    </BrowserRouter>
)
