import { Button, Checkbox, Input } from '@material-ui/core';
import React from 'react';
import { EInputType, IOnClickInputHookBind, IUseInputHook, useInput } from '../../../Utils/useInput';
import styles from './TodoForm.module.scss';

const TodoForm = () => {
  const textInputHook: IUseInputHook<string> = useInput(EInputType.text);
  const isFinishedInputHook: IUseInputHook<boolean> = useInput(EInputType.checkbox);
  const submitInputHook: IUseInputHook<boolean> = useInput(EInputType.button, {
    onClick: () => {
      
    }
  });

  return <div className={styles.TodoForm}>
    <form>
      <Input {...textInputHook.bind} aria-describedby="The text description of the todo" />
      <Checkbox {...isFinishedInputHook.bind} aria-describedby="The text description of the todo" />
      <Button {...submitInputHook.bind as IOnClickInputHookBind}>Submit Todo</Button>
    </form>
  </div>
};

export default TodoForm;
