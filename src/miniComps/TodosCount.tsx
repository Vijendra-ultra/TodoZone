import { useEffect, useState } from "react";
import { todos } from "../types";
type TodosCountprop = {
  todosArr: todos[];
};
const TodosCount: React.FC<TodosCountprop> = ({ todosArr }) => {
  const [todosLength, setNewTodoslength] = useState<number>(todosArr.length);
  useEffect(() => {
    setNewTodoslength(todosArr.length);
  }, [todosArr]);
  return (
    <div className="flex justify-center italic text-gray-500 text-xl font-bold items-center">
      <span className="pt-4">
        {todosLength <= 0 ? (
          <span>No todos to do</span>
        ) : (
          `Found ${todosLength} todos`
        )}
      </span>
    </div>
  );
};
export default TodosCount;
