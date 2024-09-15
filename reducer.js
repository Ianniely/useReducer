export const initialState = {
    isAuthenticated: false,
    user: null,
    todos: []
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, isAuthenticated: true, user: action.payload };
      case "LOGOUT":
        return { ...state, isAuthenticated: false, user: null, todos: [] };
      case "ADD_TODO":
        return { ...state, todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }] };
      case "TOGGLE_TODO":
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
          )
        };
      case "REMOVE_TODO":
        return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
      default:
        return state;
    }
  };
  