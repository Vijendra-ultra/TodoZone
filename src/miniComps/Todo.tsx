import { todos } from "../types";
type TodoProps = {
  todo: todos;
  handleComplete: (todoId: number) => void;
};
const Todo: React.FC<TodoProps> = ({ todo, handleComplete }) => {
  return (
    <>
      {!todo.completed && (
        <div className="text-xl flex items-center py-2 bg-pink-400 mb-3 pl-2">
          <span className="pl-2">{todo.todo_text}</span>
          <button
            className="ml-auto text-2xl text-gray-900 pr-3"
            onClick={() => handleComplete(todo.id)}
          >
            X
          </button>
        </div>
      )}
    </>
  );
};
export default Todo;
