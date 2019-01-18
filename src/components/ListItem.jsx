import React from 'react';
import EditArea from './EditArea';
import '../App.css'
// props = {
// todo: todo,
// onClick: () => this.handleComplete(todo)
// }
const ListItem = ({ todo, onClick, onCommentChange, onDateChange, onStar, onDelete }) => {
  let showEditArea = (todo) => todo.expand && <EditArea todo={todo}
    onCommentChange={onCommentChange}
    onDateChange={onDateChange}
  />
return (
  <div className="todoItem">
    <li
      onClick={onClick}
      style={{
        textDecoration: todo.completed ? 'line-through' : 'unset',
      }}
    >
      {todo.text}
    </li>
    {showEditArea(todo)}

    <button
      type="button"
      onClick={onStar}
      style={{ color: todo.isStar === true ? '#FFDF39' : '#000' }}
    >
      <i className="far fa-star" />
    </button>
    <button
      type="button"
      onClick={onDelete}
    >
      <i className="far fa-trash-alt" />
    </button>
  </div>
);};

// var ShowEditArea = (todo) => {
//   if(todo.expand){
//     return  <EditArea todo={todo} onChange={}/>
//   }
// }
export default ListItem;
