import React, { useState } from "react";            //imports react and use state.
import TodoForm from "./TodoForm";                  //imports "To Do Form"
import Todo from "./Todo";                          //imports "To Do"

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {                            //function to add a task to the To Do List
    if (!todo.text || /^\s*$/.test(todo.text)) {       //ensures that empty spaces cannot be added as list items
      return;                                          //(copied from Internet; all I can say for sure is that it works, not why)
    }

    const newTodos = [todo, ...todos];                 //sets array to include newest item (todo) and all previous items (the spread of "todos")

    setTodos(newTodos);                                //sets list to display all items stored in array.
    console.log(...todos);                             //console test to make sure items are being stored.
  };

  const updateTodo = (todoId, newValue) => {                //function for updating task items, calling on an item's ID
    if (!newValue.text || /^\s*$/.test(newValue.text)) {    //ensures that a list item cannot be replaced by empty spaces)
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {                                        //function for deleting an item
    const removedArr = [...todos].filter(todo => todo.id !== id);   //removes item from array using the "filter" method.

    setTodos(removedArr);
  };

  const completeTodo = id => {                      //function that declares a "complete" item once an edited item is updated.
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {                         //if statement to determine if this is "complete"
        todo.isComplete = !todo.isComplete;    
      }
      return todo;                              
    });
    setTodos(updatedTodos);                         //sets the list item value ("To Do") to the updated value.
  };

  return (
    <>
      <h1>Tasks to Complete:</h1>                       
      <TodoForm onSubmit={addTodo} /> 
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );                                                    //creates h1 for heading; sets addition of list item ("To Do") on submission; also establishes remove and update.
}

export default TodoList;                                //exports component for use in app.