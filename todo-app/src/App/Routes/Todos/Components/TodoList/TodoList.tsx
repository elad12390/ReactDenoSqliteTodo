import React from "react";
import { ITodoItem } from "../../todo.models";
import TodoItem from "../TodoItem/TodoItem";
import styles from './TodoList.module.scss';

export interface ITodoListParams {
    data?: ITodoItem[],
    refetch: Function
}

export function TodoList({data, refetch}: ITodoListParams) {
  return <div className={styles.TodoList}>

      {data?.map(todo => <div key={'todoItem_' + todo.id}>
          <TodoItem updateTable={refetch} todo={todo} />
        </div>)}
        
      </div>
}
  