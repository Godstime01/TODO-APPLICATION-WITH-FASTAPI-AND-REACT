import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    fetch('http://localhost:8000/api/todo')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  }, [todos]);

  const handleUpdate = (title) => {
    fetch(`http://localhost:8000/api/todo/${title}`)
      .then(response => response.json())
  }

  const handleDelete = (title) => {
    fetch(`http://localhost:8000/api/todo/${title}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error deleting todo:', error));
  }

  const handleCreateTodo = () => {
    fetch(`http://localhost:8000/api/todo`, {
      method: "POST",
      body: JSON.stringify({
        "title": todo,
        "description": description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(newTodo => {
      // Update state to include the newly created todo
      setTodos(prevTodos => [...prevTodos, newTodo]);
    })
    .catch(error => {
      console.error('Error creating todo:', error);
    });

  }

  return (
    <div>
      <h1>Todo App</h1>

    <div>
      <input value={todo} onChange = {(e) => setTodo(e.target.value)} type="text" placeholder='Add a todo' />
      <textarea value={description} onChange = {(e) => setDescription(e.target.value)} placeholder="Enter a description"></textarea>
      <button type="button" onClick={handleCreateTodo}>add todo</button>
    </div>

      <ul>
        {todos.map(todo => (
          <>
            <li key={todo.id}>{todo.title}</li>
            <button onClick={() => handleUpdate(todo.title)}>Update</button>
            <button onClick={() => handleDelete(todo.title)}>Delete</button>
          </>
        ))}
      </ul>
    </div>
  );
}

export default App
