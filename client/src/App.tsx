import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import styles from './css/container.module.css';
import { Navbar } from './components/layout/Navbar/Navbar';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { AppRouter } from './components/AppRouter';
import { checkAuth } from './store/actionCreators/currentUserActions';
import { getIsAuth } from './store/slices/currentUserSlice';
import { Loader } from './components/UI/loader/Loader';
import getToken from './utils/getToken';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  let isAuth = getIsAuth();
  const {user, isLoading, error} = useAppSelector(state => state.currentUserReducer)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(checkAuth());
    }
    
    console.log(location.pathname)
    if (location.pathname !== '/emailVerified') {
      if (isAuth) {
        navigate('/todos');
      } else {
        navigate('/home');
      }   
    }
    
  }, [isAuth]);

  if (isLoading && getToken()) {
    return <Loader/>
  }
  
  return (
    <div className="App">
      <Navbar/>
      <div className={styles.container}>

      <AppRouter/>
        
      </div>
    </div>
  )
}

export default App
