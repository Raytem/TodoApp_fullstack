import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { routes } from './routes';
import store from './store/index';
import styles from './css/container.module.css';

function App() {
  const navigate = useNavigate();

  // useEffect(() => navigate('/todos'), []);
  
  return (
    <Provider store={store}>
      <div className="App">
        <div className={styles.container}>
          
          <Routes>
            {
              routes.map(({path, Element}) => 
                <Route path={path} element={<Element/>} key={path}/>
              )
            }
          </Routes>
          
        </div>
      </div>
    </Provider>
  )
}

export default App
