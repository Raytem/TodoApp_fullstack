import './App.css';
import styles from './css/container.module.css';
import { TodosPage } from './pages/TodosPage';

function App() {
  return (
    <div className="App">
      <div className={styles.container}>

        <TodosPage/>

      </div>
    </div>
  )
}

export default App
