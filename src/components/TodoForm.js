import React, { useState, useEffect, useRef } from "react";                 //imports React, Use State, Use Effect, and UseRef

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : ""); 

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {                                           //creates the "handle change" function
    setInput(e.target.value);                                           //sets the input equal to the target value (equal to text inputed by user)
  };

  const handleSubmit = e => {                                           //creates the "handle submit" function
    e.preventDefault();                                                 //prevents page from refreshing when submit button is clicked.

    props.onSubmit({
      id: Math.floor(Math.random() * 100000),                            //generates a random ID for each list item on submission.
      text: input                                                        //sets displayed text to match user input.
    });
    setInput("");                                                       //sets input to empty string - clears text box after each submission.
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update a Task."                                //placeholder text for "Edit Task" form
            value={input}                                               //sets the value of the item equal to user's input
            onChange={handleChange}                                     //updates the stored value
            name="text"                                                 //sets input to text.
            ref={inputRef}
            className="todo-input edit"                                 //creates class name for the updated information.
          />
          <button onClick={handleSubmit} className="todo-button edit">  
            Edit Task
          </button>                                                     
        </>                                                             //creates the "Edit Task" button
      ) : ( 
        <>
          <input
            placeholder="Add a Task."                                   //placeholder text for "Add Task" form
            value={input}                                               //sets the value of the item equal to user's input
            onChange={handleChange}                                     //updates the stored value
            name="text"                                                 //sets input to text
            className="todo-input"                                      //creates a class name for the information inputed
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="todo-button">       
            Add Task
          </button>                                                     
        </>                                                             //creates the "Add Task" button.
      )}
    </form>
  );
}

export default TodoForm;