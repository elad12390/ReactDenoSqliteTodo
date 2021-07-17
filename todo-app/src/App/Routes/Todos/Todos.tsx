import React from 'react';
import { useGetRequestHook } from '../../Utils/dataFetcherHook';
import TodoForm from './TodoForm/TodoForm';
import styles from './Todos.module.scss';

const Todos = () => {
  useGetRequestHook('http://localho.st:8000/todo/', (data) => {
    console.log({data});
  })


  return (
    <div className={styles.Todos}>
      <TodoForm />
    </div>
  );
};

export default Todos;
