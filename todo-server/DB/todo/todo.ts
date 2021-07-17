import { DB } from 'https://deno.land/x/sqlite/mod.ts';
import { ITodoItem } from './todo.dbmodel.ts';
export class TodoDB extends DB {
  constructor() {
    super('./todos.db');
  
    this.query(
      'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, todo TEXT, isfinished INTEGER)',
    );
  }
  
  getTodos = () => {
    const todos: ITodoItem[] = [];
    for (const [id, todo, isFinished] of this.query('select * from todos')) {
      todos.push({id, todo, isFinished});
    }
    return todos;
  }
  
  getTodo = (todoId: number) => {
    for (const [id, todo, isFinished] of this.query('select * from todos where id=?', [todoId])) {
      return {id, todo, isFinished} as ITodoItem;
    }
  }
  
  createTodo = (newItem: ITodoItem) => {
    console.log('creating new item', newItem);
    this.query('INSERT INTO todos (todo, isfinished) VALUES (?, ?)', [newItem.todo, newItem.isFinished]);
  }
  
  updateTodo = (newItem: ITodoItem) => {
    if (!newItem.id) return;
    this.query('UPDATE todos SET todo = ?, isfinished = ? WHERE id = ?', [newItem.todo, newItem.isFinished, newItem.id]);
  }
  
  deleteTodo = (itemId: number) => {
    this.query('DELETE FROM todos WHERE id=?', [itemId]);
  }
  
}