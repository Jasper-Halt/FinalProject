import React, { useState } from "react";                                //imports React and Use State
import TodoForm from "./TodoForm";                                      //imports "To Do Form"
import { RiCloseCircleLine } from "react-icons/ri";                     //imports React icons for Edit/Delete Buttons
import { TiEdit } from "react-icons/ti";                                //imports React icons for Edit/Delete Buttons

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ""
  });

  const submitUpdate = value => {                                       //update function, for editing a list item
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ""
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (                                   //maps through array of list items
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}    //checks if list item ("To Do") is complete (if not, keeps class as blank row.)
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
      <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}    //creates icon for Edit Button, sets it to edit on click.
          className="edit-icon"
        />
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}                           //creates icon for Delete Button, sets it to remove item on click
          className="delete-icon"
        />
      </div>
    </div>
  ));
};

export default Todo;