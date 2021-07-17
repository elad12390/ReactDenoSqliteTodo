import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { ITodoItem } from './todo.models';
import TodoForm from './TodoForm/TodoForm';
import TodoItem from './TodoItem/TodoItem';
import styles from './Todos.module.scss';



const Todos = () => {
  

  const {data, isLoading, error} = useQuery('/todos/', () => axios.get('http://localhost:8000/todo/').then(res => res.data as ITodoItem[]));

  return (
    <div className={styles.Todos}>
      {data?.map((todo) => (
        <div key={'todoItem_'+todo.id}>
          <TodoItem todo={todo}/>
        </div>
      ))}
      <TodoForm />
    </div>
  );
};

export default Todos;
