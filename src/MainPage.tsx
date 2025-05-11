import "./App.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { User } from "@supabase/supabase-js";
import { todos } from "./types";

import TodoDisplayer from "./miniComps/TodoDisplayer";
import TodosCount from "./miniComps/TodosCount";
import { supabase } from "./SupabaseClient";

type MainPageProp = {
  user: User;
};

//define function definition like this
type handleAddTodo = () => void;
type handleComplete = (todosId: number) => void;

const MainPage: React.FC<MainPageProp> = ({ user }) => {
  const [todotext, setTodotext] = useState<string>("");
  const [todos, setTodos] = useState<todos[]>([]);

  const navigateToPage = useNavigate();

  //Function to add to
  const handleAddTodo: handleAddTodo = () => {
    if (!todotext) return;
    if (!user) return;
    if (todotext.trim() === "") {
      setTodotext("");
      return;
    }
    todoUpdater(todotext);

    setTodotext("");
  };

  //Adds todo to db
  async function todoUpdater(todotext: string): Promise<void> {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ todo_text: todotext, user_id: user.id }]);
    setTodos((todos) => [
      ...todos,
      { todo_text: todotext, id: todos.length + 1, completed: false },
    ]);
    if (data) {
    }
    if (error) {
      console.log(error);
    }
  }
  const handleComplete: handleComplete = (todosId) => {
    setTodos(todos.filter((todos) => todos.id !== todosId));
  };

  useEffect(() => {
    if (user === null) {
      navigateToPage("/");
    }
  }, [user]);

  // Fetches todo if any
  useEffect(() => {
    if (user === null) return;
    const getTododfromDb = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });
      if (data) {
        console.log(data);
        setTodos(data);
      }
      if (error) {
        console.log("Error");
      }
    };
    getTododfromDb();
  }, [user]);

  return (
    <>
      {user !== null && (
        <div className="pt-3">
          <div className="flex justify-center items-center">
            <input
              type="text"
              className="bg-yellow-400 px-4 py-3 text-xl text-black placeholder:text-white"
              placeholder="Enter task"
              value={todotext}
              onChange={(e) => setTodotext(e.target.value)}
            />

            <button
              onClick={handleAddTodo}
              className="px-4 py-4 rounded-md bg-green-500"
            >
              Add
            </button>
          </div>
          <TodosCount todosArr={todos} />
          <TodoDisplayer todosList={todos} onClick={handleComplete} />
        </div>
      )}
    </>
  );
};

export default MainPage;
