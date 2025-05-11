import Todo from "./Todo";
import { todos } from "../types";
type todoArrProp = {
  todosList: todos[];
  onClick: () => void;
};
const TodoDisplayer: React.FC<todoArrProp> = ({ todosList, onClick }) => {
  return (
    <div className="pt-5 mx-3 sm:mx-36">
      <div className="md:px-36 ">
        {todosList.map((todo) => (
          <Todo key={todo.id} onClick={onClick} todo={todo} />
        ))}
      </div>
    </div>
  );
};
export default TodoDisplayer;
