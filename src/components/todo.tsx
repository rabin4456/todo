import { useEffect, useState, useRef } from "react";
import TodoList from "./todoList";
import { ImFilter } from "react-icons/im";
type input = {
  inp: string;
};
const Todo = () => {
  const [input, setInput] = useState<any>({ inp: "" });
  const [todos, setTodos] = useState<any>([]);
  const [edit, setEdit] = useState<any>(null);
  const [option, setOption] = useState<any>("");
  const [filter, setFilter] = useState<any>([]);

  const filterRef = useRef<HTMLInputElement | null>(null);

  const date = new Date();
  useEffect(() => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localSto = localStorage.getItem("todos");
      setTodos(JSON.parse(localSto as string));
      console.log(todos, "toooodooo");
    }
  }, []);
  useEffect(() => {
    if (option === "pending") {
      setFilter(todos.filter((el: any) => el.completed === false));
    } else if (option === "completed") {
      setFilter(todos.filter((el: any) => el.completed === true));
    } else {
      setFilter(todos);
    }
    local();
  }, [option, todos]);
  const local = () => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };

  const updateTodos = (input: any, idd: any, comp: any) => {
    const newtodo = todos.map((el: any) => {
      return el.id === idd ? { input: input, id: idd, completed: comp } : el;
    });
    console.log("newtodo", newtodo);

    setTodos(newtodo);
    setEdit(null);
  };

  const handelSubmit = (e: any) => {
    e.preventDefault();
    if (input.inp === "") return;

    if (!edit) {
      setTodos([...todos, { input: input.inp, id: date, completed: false }]);
    } else {
      updateTodos(input.inp, edit.id, edit.completed);
    }

    setInput({ inp: "" });
  };
  console.log(filter, "filter");
  // console.log(todos.length, "=============");
  console.count("cooo");
  // console.count("count");
  return (
    <>
      <div className=" flex justify-center mt-20 ">
        <div className="flex-column w-1/3">
          <form
            action=""
            onSubmit={handelSubmit}
            className="grid grid-cols-10 gap-2"
          >
            <input
              type="text"
              name="todo"
              placeholder="todos.."
              value={input.inp}
              onChange={(e) => setInput({ inp: e.target.value })}
              className="col-span-6"
              ref={filterRef}
            />
            <button
              className="bg-orange-400 rounded-md p-1 text-white col-span-2
            "
            >
              submit
            </button>
            <div className="flex col-span-2 ">
              <div
                className="text-green-300 p-2 self-center text-xl bg-slate-50 "
                onClick={() => filterRef.current && filterRef.current.focus()}
              >
                <ImFilter />
              </div>
              <select
                className="bg-slate-50 focus:outline-none"
                id="filter"
                name=""
                value={option}
                onChange={(e) => setOption(e.target.value)}
                // ref={filterRef}
              >
                <option value="all" className="bg-slate-100 ">
                  All
                </option>
                <option value="pending" className="bg-slate-100 ">
                  pending
                </option>
                <option value="completed" className="bg-slate-300 ">
                  completed
                </option>
              </select>
            </div>
          </form>
          <div>
            <TodoList
              todo={todos}
              setTodos={setTodos}
              setInput={setInput}
              setEdit={setEdit}
              edit={edit}
              filter={filter}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
