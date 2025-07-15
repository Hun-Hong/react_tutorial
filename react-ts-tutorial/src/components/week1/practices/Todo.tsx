import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState("")

  const addTodo = () => {
    if (inputText.trim() === "") return

    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      done: false
    }

    setTodos([...todos, newTodo])
    setInputText("")
  }

  const toggleTodo = (id: number) => {
    // console.log(id)
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  return (
    <div>
      <h2>할 일 목록</h2>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={addTodo}>추가</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span style={{
                textDecoration: todo.done ? "line-through" : "none"
              }}>
                {todo.text}

              </span>

            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoApp