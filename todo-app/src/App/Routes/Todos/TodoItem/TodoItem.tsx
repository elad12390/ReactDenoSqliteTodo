import { Checkbox, IconButton } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import React from 'react';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { EInputType, IOnClickInputHookBind, IUseInputHook, useInput } from '../../../Utils/useInput';
import { ITodoItem } from '../todo.models';
import styles from './TodoItem.module.scss';
import DeleteIcon from '@material-ui/icons/Delete';

export interface ITodoItemParams {
  todo: ITodoItem;
  updateTable: Function;
}

export const TodoItem = ({todo, updateTable}: ITodoItemParams) => {

   // Mutations
   const editMutation = useMutation((newTodo: ITodoItem) => axios.put('/todo/', newTodo));
   const deleteMutation = useMutation((deleteId: number) => axios.delete(`/todo/${deleteId}`));

  const isFinishedInputHook: IUseInputHook<boolean> = useInput(EInputType.checkbox, {
    initialValue: todo.isFinished === 1,
    onChange: (val) => {
      todo.isFinished = !!val ? 1 : 0;
      editMutation.mutate(todo);
    }
  });
  const submitInputHook: IUseInputHook<boolean> = useInput(EInputType.button, {
    onClick: async () => {
      if (!todo.id) return;
      await deleteMutation.mutateAsync(todo.id!);
      updateTable();
    }
  });
  return (
  <div className={styles.TodoItem}>
      <Input style={{textDecoration: todo.isFinished === 1 ? 'line-through' : 'none'}} disabled={true} value={todo.todo} aria-describedby="The text description of the todo" />
      <Checkbox {...isFinishedInputHook.bind} aria-describedby="The text description of the todo" />
      <IconButton {...submitInputHook.bind as IOnClickInputHookBind} aria-label="delete" color="primary">
        <DeleteIcon />
      </IconButton>
  </div>)
};

export default TodoItem;
