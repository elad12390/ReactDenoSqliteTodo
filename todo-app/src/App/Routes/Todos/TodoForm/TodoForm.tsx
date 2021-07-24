import { Button, Checkbox, Input } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useMutation } from 'react-query';
import { EInputType, IOnClickInputHookBind, IUseInputHook, useInput } from '../../../Utils/useInput';
import { ITodoItem } from '../todo.models';
import styles from './TodoForm.module.scss';

export interface TodoFormParams {
  updateTable: Function;
}

const TodoForm = ({updateTable}: TodoFormParams) => {
  const textInputHook: IUseInputHook<string> = useInput(EInputType.text);
  const isFinishedInputHook: IUseInputHook<boolean> = useInput(EInputType.checkbox);
  const submitInputHook: IUseInputHook<boolean> = useInput(EInputType.button, {
    onClick: async () => {
      await postMutation.mutateAsync({todo: textInputHook.value, isFinished: +isFinishedInputHook.value});
      updateTable();
      textInputHook.reset();
      isFinishedInputHook.reset();
    }
  });
  const postMutation = useMutation((newTodo: ITodoItem) => axios.post('/todo/', newTodo));

  return <div className={styles.TodoForm}>
    <form>
      <Input {...textInputHook.bind} aria-describedby="The text description of the todo" />
      <Checkbox {...isFinishedInputHook.bind} aria-describedby="The text description of the todo" />
      <Button {...submitInputHook.bind as IOnClickInputHookBind}>Submit Todo</Button>
    </form>
  </div>
};

export default TodoForm;
