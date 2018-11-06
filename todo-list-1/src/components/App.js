import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const initialTodos = new Array(500).fill(0).map(
    (foo, index) => ({id: index, text: `일정 ${index}`, done: false})
);

class App extends Component {
    state = {
        input: '', // TodoInput의 input 값
        todos: initialTodos,
    }

    //일정 데이터 안에 들어가는 id 값
    id = 1
    getId = () => {
        return ++this.id;
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState ({
            input: value
        });
    }

    //TodoInput을 통해 새 데이터 추가
    handleInsert = () =>{
        const {todos, input} = this.state;

        //새 데이터 객체 만들기
        const newTodo = {
            id: this.getId(),
            text: input,
            done: false
        };

        //배열 안에 새 데이터를 넣음
        this.setState ({
            todos: [...todos, newTodo],
            input: ''
        });
    }

    //TodoItem 토글하기(토글: 2가지 값 중 값을 전환하는 것)
    handleToggle = (id) => {
        //id로 배열의 인덱스를 찾습니다.
        const {todos} = this.state;
        const index = todos.findIndex(todo => todo.id === id);

        //찾은 데이터의 done 값을 전환합니다.
        const toggled = {
            ...todos[index],
            done: !todos[index].done
        };

        //slice를 사용하여 우리가 찾은 index 전후(선택된 것을 제외한 앞뒤) 데이터를 복사합니다.
        //그리고 그 사이에는 변경된 to do 객체를 넣어줍니다.
        this.setState({
            todos: [
                ...todos.slice(0,index),
                toggled,
                ...todos.slice(index+1,todos.length)
            ]
        });
    }

    //선택한 id를 배열에서 제거합니다.
    handleRemove = (id) => {
        const {todos} = this.state;
        const index = todos.findIndex(todo => todo.id === id);

        //slice로 선택한 객체를 제외한 전후 데이터를 복사하고 이어붙여, 선택한 객체를 삭제합니다.
        this.setState ({
            todos: [
                ...todos.slice(0, index),
                ...todos.slice(index + 1, todos.length)
            ]
        });
    }

    

    render() {
        //비구조화 할당
        const {input, todos} = this.state;
        const {
            handleChange,
            handleInsert,
            handleToggle,
            handleRemove
        } = this;


        return (
            <PageTemplate>
                <TodoInput onChange={handleChange} onInsert={handleInsert} value={input}/>
                <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
            </PageTemplate>
        );
    }
}

export default App;