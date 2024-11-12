"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export function TodoAppComponent() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">할 일 목록</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="새로운 할 일을 입력하세요"
          className="flex-grow mr-2"
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <Button onClick={addTodo}>추가</Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
            <div className="flex items-center">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`ml-2 ${todo.completed ? "line-through text-gray-500" : ""}`}
              >
                {todo.text}
              </label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTodo(todo.id)}
              aria-label="할 일 삭제"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}