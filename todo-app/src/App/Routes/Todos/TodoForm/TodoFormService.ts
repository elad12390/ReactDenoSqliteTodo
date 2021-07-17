import { Observable, of } from "rxjs"

export interface IPostTodoRequest {

}

export const postNewTodo$ = (todo: IPostTodoRequest): Observable<any> => {
	return of(null);
}