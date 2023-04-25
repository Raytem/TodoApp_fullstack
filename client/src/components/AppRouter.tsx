
import { Route, Routes } from 'react-router-dom'
import { authRoutes, routes } from '../routes'
import { getIsAuth } from '../store/slices/currentUserSlice';

export const AppRouter = () => {

    return (
        <div>
            <Routes>
            {
                getIsAuth()
                ?
                    authRoutes.map(({path, Element}) => 
                    <Route path={path} element={<Element/>} key={path}/>
                    )
                :
                    routes.map(({path, Element}) => 
                    <Route path={path} element={<Element/>} key={path}/>
                    )
            }
            </Routes>
        </div>
    )
}
