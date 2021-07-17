import { Checkbox } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import React from 'react';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { EInputType, IUseInputHook, useInput } from '../../../Utils/useInput';
import { ITodoItem } from '../todo.models';
import styles from './TodoItem.module.scss';

export interface ITodoItemParams {
  todo: ITodoItem
}

export const TodoItem = ({todo}: ITodoItemParams) => {
   // Access the client
   const queryClient = useQueryClient()
  
   // Mutations
   const mutation = useMutation((newTodo: ITodoItem) => axios.put('/todo/', newTodo));

  const isFinishedInputHook: IUseInputHook<boolean> = useInput(EInputType.checkbox, {
    initialValue: todo.isFinished === 1,
    onChange: (val) => {
      todo.isFinished = !!val ? 1 : 0;
      mutation.mutate(todo);
    }
  });
  return (
  <div className={styles.TodoItem}>
      <Input style={{textDecoration: todo.isFinished === 1 ? 'line-through' : 'none'}} disabled={true} value={todo.todo} aria-describedby="The text description of the todo" />
      <Checkbox {...isFinishedInputHook.bind} aria-describedby="The text description of the todo" />
  </div>)
};

export default TodoItem;
