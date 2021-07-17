import { RouteParams, Router, RouterContext } from 'https://deno.land/x/oak@v7.7.0/router.ts';
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { TodoDB } from "../../DB/todo/todo.ts";
import { ITodoItem } from "../../DB/todo/todo.dbmodel.ts";

const todos = new Map<string, any>();
todos.set('1', {
  id: '1',
  title: 'The Hound of the Baskervilles',
  author: 'Conan Doyle, Arthur',
});

export const create = (basePath: string, router: Router) => {
  // create db
  const todoDB = new TodoDB();

  console.log(basePath + '/');
  router
  .get(basePath + '/', (ctx: RouterContext) => {
    ctx.response.body = todoDB.getTodos();
  })
  .get(basePath + '/:id', (ctx: RouterContext) => {
    if (ctx.params && ctx.params.id && todos.has(ctx.params.id)) {
      const idNum = Number(ctx.params.id);
      if (idNum) {
        ctx.response.body = todoDB.getTodo(idNum);
      }
    }
  })
  .post(basePath + '/', (ctx: RouterContext) => {
    const body = ctx.request.body({type: 'json'});
    body.value.then((val: ITodoItem) => {
      todoDB.createTodo(val);
    });
  })
  .put(basePath + '/', (ctx: RouterContext) => {
    const body = ctx.request.body({type: 'json'});
    console.log('requested update todo');
    body.value.then((val: ITodoItem) => {
      todoDB.updateTodo(val);
      ctx.response.body = true;
    });
  })
  .delete(basePath + '/:id', (ctx: RouterContext) => {
    if (ctx.params && ctx.params.id) {
      const idNum = Number(ctx.params.id);
      if (idNum) {
        todoDB.deleteTodo(idNum);
      }
    }
  })
}

export default create;