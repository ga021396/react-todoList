import React from 'react';
import '../App.css'

const EditArea = ({ todo, onCommentChange, onDateChange }) => (
  <div>
      <input type="text" value={todo.comment} onChange={onCommentChange}/>
      <input type="date" value={todo.date} onChange={onDateChange}/>
  </div>
);

export default EditArea;
