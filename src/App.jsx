import React, { Component } from 'react';
import ListItem from './components/ListItem';
import './App.css';

class App extends Component {
  state = {
    todo: '',
    todoList: [],
    visibility: 'all'
  };
  handleNavbarAct = state => {
    this.setState({
      visibility: state
    });
  };
  handleTodoChange = event => {
    this.setState({
      todo: event.target.value,
    });
  };

  handleNewTodo = () => {
    if (this.state.todo) {
      const newTodo = {
        id: Math.floor(Date.now()),
        text: this.state.todo,
        completed: false,
        expand: true,
        comment: '',
        date: '',
        isStar: false,
      };
      this.setState({
        todoList: [newTodo, ...this.state.todoList],
        todo: '',
      });
    }
  };

  handleComplete = todo => {
    let complete = this.state.todoList.map(x => {
      if (x.id === todo.id) {
        return {
          ...x,
          completed: !x.completed,
          expand: !x.expand,
        };
      }
      return x;
    });
    complete.sort(function(a, b) {
      return a.completed - b.completed;
    });
    this.setState({
      todoList: complete,
    });
  };

  setComment = (todo, event) => {
    this.setState({
      todoList: this.state.todoList.map(x => {
        if (x.id === todo.id) {
          return {
            ...x,
            comment: event.target.value,
          };
        }
        return x;
      }),
    });
  };

  setDate = (todo, event) => {
    console.log(todo.date);
    this.setState({
      todoList: this.state.todoList.map(x => {
        if (x.id === todo.id) {
          return {
            ...x,
            date: event.target.value,
          };
        }
        return x;
      }),
    });
  };

  handleStar = todo => {
    let newTodo = this.state.todoList.map(x => {
      if (x.id === todo.id) {
        return {
          ...x,
          isStar: !x.isStar,
        };
      }
      return x;
    }).sort((a, b) => {
      return b.isStar - a.isStar;
    });
    this.setState({
      todoList: newTodo,
    });
  };

  handleDelete = todo => {
    const shallowCopyTodoList = [...this.state.todoList];
    let index = shallowCopyTodoList.findIndex(x => x.id === todo.id);
    shallowCopyTodoList.splice(index, 1);
    this.setState({
      todoList: shallowCopyTodoList,
    });
  };

  // showListItem = () =>
  // this.state.todoList.map((todo, i) => {
  // return (
  //   <ListItem
  //     key={i}
  //     onClick={() => this.handleComplete(todo)}
  //     todo={todo}
  //     onCommentChange={(event) =>this.setComment(todo,event)}
  //     onDateChange={(event) =>this.setDate(todo,event)}
  //   />
  //   );
  // })
  showListItem = () => {
    let todolist = this.state.todoList;
    if (this.state.visibility === "all") {
      return todolist.map((todo, i) => {
        return this.CreateListItem(todo);
      })
    }else if (this.state.visibility === "ing") {
      let filter = todolist.filter(x => x.completed === false)
      return filter.map((todo, i) => {
        return this.CreateListItem(todo);
      }
      )
    }
    else if (this.state.visibility === "com") {
      let filter = todolist.filter(x => x.completed === true)
      return filter.map((todo, i) => {
        return this.CreateListItem(todo);
      }
      )
    }}
    CreateListItem = (todo) => {
      return (
        <ListItem
          key={todo.id}
          onClick={() => this.handleComplete(todo)}
          todo={todo}   
          onCommentChange={(event) => this.setComment(todo, event)}
          onDateChange={(event) => this.setDate(todo, event)}
          onStar={() => this.handleStar(todo)}
          onDelete={() => this.handleDelete(todo)}
        />
      );
    }

  render() {
    return (
      <div className="body">
        <div className="navbar">
          <div
            className="all"
            onClick={() => this.handleNavbarAct('all')}
            style={{
              borderBottom: this.state.visibility === "all" 
                ? '2px solid white'
                : 'none',
            }}
          >
            My Tasks
          </div>
          <div
            className="ing"
            onClick={() => this.handleNavbarAct('ing')}
            style={{
              borderBottom: this.state.visibility === "ing" 
                ? '2px solid white'
                : 'none',
            }}
          >
            In Progress
          </div>
          <div
            className="com"
            onClick={() => this.handleNavbarAct('com')}
            style={{
              borderBottom: this.state.visibility === "com" 
                ? '2px solid white'
                : 'none',
            }}
          >
            Completed
          </div>
        </div>
        <div className="container">
          <div className="header">
            <input
              type="text"
              value={this.state.todo}
              onChange={this.handleTodoChange}
            />
            <button
              id="btn"
              type="button"
              onClick={this.handleNewTodo}
            >
              New
            </button>
          </div>
          <ul>{this.showListItem()}</ul>
          <p
            style={{
              marginTop: '10px',
              color: '#888',
              fontStyle: 'italic',
            }}
          >
            {this.state.todoList.length} tasks left
          </p>
        </div>
      </div>
    );
  }
}
export default App;
