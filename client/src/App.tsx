import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import styles from './css/container.module.css';
import { CreateTodoPage } from './pages/CreateTodoPage';
import { EmailVerified } from './pages/EmailVerified';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { TodosPage } from './pages/TodosPage';
import store from './store/index';

function App() {
  const navigate = useNavigate();

  // useEffect(() => navigate('/todos'), []);
  
  return (
    <Provider store={store}>
      <div className="App">
        <div className={styles.container}>
          
          <Routes>
            <Route path='/todos' element={<TodosPage/>}/>

            <Route path='/todos/createTodo' element={<CreateTodoPage/>}/>

            <Route path='/signup' element={<SignUpPage/>}/>

            <Route path='/login' element={<LoginPage/>}/>

            <Route path='/emailVerified' element={<EmailVerified/>}></Route>
          </Routes>
          
        </div>
      </div>
    </Provider>
  )
}

export default App
