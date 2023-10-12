import { useEffect, useState } from 'react'
import './App.css'
import { SignupForm, LogoutForm } from './components/login'
import { TaskBoard, CreateTask } from './components/tasksboard'

function App() {

  const [token, setToken] = useState('' as string)

  useEffect(() => {
    setToken(localStorage.getItem('token') ?? '')
  }, [])

  return (
    <div className="App">
      { token ? <LogoutForm setToken={setToken} /> : <SignupForm setToken={setToken} />}
      { token ? <TaskBoard /> : null }
      { token ? <CreateTask /> : null }
    </div>
  )
}

export default App
