import { REGISTER_SUCCESS, REGISTER_FAIL, TODOS_SUCCESS, TODOS_FAIL , LOGIN_FAIL, LOGIN_SUCCESS, LOADING, DELETE_FAIL, DELETE_SUCCESS, ADD_SUCCESS, ADD_FAIL, EDIT_SUCCESS, EDIT_FAIL } from "../actions/types"

export const Reducer = (state, action)=>{
    const {type, payload} = action
    switch(type){
        case REGISTER_SUCCESS:
            return {
                isAuthenticated: true,
                isLoading: false,
                error: '',
                user: payload,
                todos: []
            }

        case REGISTER_FAIL:
            return {
                isAuthenticated: false,
                isLoading: false,
                error: 'Register failed',
                user: {},
                todos: []
            }

        case LOGIN_SUCCESS:
            return {
                isAuthenticated: true,
                isLoading: false,
                error: '',
                user: payload,
                todos: []
            }

        case LOGIN_FAIL:
            return {
                isAuthenticated: false,
                isLoading: false,
                error: 'Login failed',
                user: {},
                todos: []
            }

        case TODOS_SUCCESS:
            return {
                isAuthenticated: true,
                isLoading: false,
                error: '',
                user: state.user,
                todos: payload
            }

        case TODOS_FAIL:
            return {
                isAuthenticated: state.isAuthenticated,
                isLoading: false,
                error: 'Todos fetch Failed',
                user: state.user,
                todos: []
            }

        case DELETE_SUCCESS:
            return {
                isAuthenticated: state.isAuthenticated,
                isLoading: false,
                error: '',
                user: state.user,
                todos: state.todos.filter(todo => todo.id !== payload )
            }

        case DELETE_FAIL:
            return {
                isAuthenticated: state.isAuthenticated,
                isLoading: false,
                error: 'Delete Failed',
                user: state.user,
                todos: state.todos
            }

        case ADD_SUCCESS:
            return {
                isAuthenticated: state.isAuthenticated,
                isLoading: false,
                error: '',
                user: state.user,
                todos: [...state.todos, payload]
            }

        case ADD_FAIL:
            return {
                isAuthenticated: state.isAuthenticated,
                isLoading: false,
                error: 'Addition of Todo Failed',
                user: state.user,
                todos: state.todos
            }

        case EDIT_SUCCESS:
            return {
                isAuthenticated: state.isAuthenticated,
                isLoading: false,
                error: '',
                user: state.user,
                todos: state.todos.map( todo => payload.id === todo.id ? payload : todo )
            }

        case EDIT_FAIL:
            return {
                isAuthenticated: state.isAuthenticated,
                isLoading: false,
                error: 'Editing of Todo Failed',
                user: state.user,
                todos: state.todos
            }

        case LOADING:
            return {
                isAuthenticated: state.isAuthenticated,
                isLoading: payload,
                error: state.error,
                user: state.user,
                todos: state.todos
            }
            
        default:
            return state
    }

}