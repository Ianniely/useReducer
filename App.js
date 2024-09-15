import React, { useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "./reducer"; // Importa o reducer e o estado inicial
import { motivationalQuotes } from "./quotes"; // Importa as frases motivacionais

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState("");
  const [username, setUsername] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  const login = () => {
    if (username.trim()) {
      dispatch({ type: "LOGIN", payload: username });
      setUsername("");
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setNewTodo("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {!state.isAuthenticated ? (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu nome"
          />
          <button onClick={login}>Entrar</button>
        </div>
      ) : (
        <div>
          <h1>Bem-vindo, {state.user}!</h1>
          <p>{quote}</p>
          <button onClick={logout}>Sair</button>

          <div>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Adicione uma tarefa"
            />
            <button onClick={addTodo}>Adicionar</button>
          </div>

          <ul>
            {state.todos.map(todo => (
              <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "" }}>
                {todo.text}
                <button onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}>
                  {todo.completed ? "Desmarcar" : "Completar"}
                </button>
                <button onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
