import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState } from 'react'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      "id": 1,
      "text": "Doctor's Appointment",
      "date": "Mar 28th at 2:30pm",
      "reminder": true
    },
    {
      "id": 2,
      "text": "Birthday Party",
      "date": "Apr 18th at 7:00pm",
      "reminder": false
    },
    {
      "id": 3,
      "text": "Dentist Appointment",
      "date": "May 28th at 9:00am",
      "reminder": true
    }
  ])

// Add Task

const addTask = (task) => {

  // Use this to create id if no backend database or db.json

  const id = Math.floor(Math.random() * 10000) + 1
  const newTask = { id, ...task }
  setTasks([...tasks, newTask])
}

// Delete Task

const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id ))
}

// Toggle Reminder

const toggleReminder = (id) => {
  setTasks(
    tasks.map((task) => 
    task.id === id ? { ...task, reminder: 
    !task.reminder } : task
    )
  )
}

  return (
    <Router>
    <div className='container'>
     <Header onAdd={() => setShowAddTask (!showAddTask)} 
     showAdd={showAddTask} />
     <Route path='/' exact render={(props) => (
       <>
        {showAddTask && <AddTask onAdd={addTask} />}
     {tasks.length > 0 ? ( 
     <Tasks tasks={tasks} 
     onDelete={deleteTask} onToggle={toggleReminder} /> 
     ) : (
       "You have no tasks"
     )}
       </>
     )} />
     <Route path='/about' component={About} />
     <Footer />
    </div>
    </Router>
  );
}

export default App;
