import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { TodoList } from './Components/TodoList/TodoList';
import { ITodoItem } from './todo.models';
import NewTodoForm from './Components/TodoForm/NewTodoForm';
import styles from './Todos.module.scss';
import { CircularProgress } from '@material-ui/core';



const Todos = () => {
  

  const {data, isLoading, error, refetch} = useQuery('/todos/', () => axios.get('http://localhost:8000/todo/').then(res => res.data as ITodoItem[]));

  return (
    <div className={styles.Todos}>
      <div className={styles.ContentWrapper}>
        {isLoading ? <CircularProgress /> : <>
          <TodoList data={data} refetch={refetch} />
          <NewTodoForm updateTable={refetch} />
        </>}
      </div>
    </div>
  );
};

export default Todos;
