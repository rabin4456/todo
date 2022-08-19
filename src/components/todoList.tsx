import React, { useState } from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import { BsFillExclamationOctagonFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

const TodoList = (props: any) => {
  //   console.log(props.todo.input, "======");
  const handelcomplete = (id: any) => {
    props.setTodos(
      props.todo.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };
  const handelDelete = (id: any) => {
    props.setTodos(props.todo.filter((el: any) => el.id !== id));
  };
  const handelEdit = (id: any) => {
    const findtodo = props.todo.find((el: any) => el.id === id);
    props.setEdit(findtodo);
    props.setInput({ inp: `${findtodo.input}` });
  };
  console.log(props.filter, "+++");
  return (
    <div>
      {props.filter && props.filter.length >= 1 ? (
        <>
          Todo list
          {props.filter.map((el: any, index: number) => (
            <div key={el.id} className=" grid grid-cols-9 gap-2">
              <div className="flex justify-between border-2 rounded-md mb-2 col-span-8">
                <div className="my-auto flex ">
                  <div className="px-2">{index + 1}.</div>

                  <h4>{el.input}</h4>
                </div>
                <div className="flex ">
                  <div>
                    <button className="p-2 text-orange-400 text-4xl">+</button>
                  </div>
                  <div className="my-auto">
                    <button
                      className="p-2 text-red-500 text-xl font-bold"
                      onClick={() => handelDelete(el.id)}
                    >
                      X
                    </button>
                  </div>
                  <div className="my-auto">
                    <button
                      className="p-2 text-xl text-green-400"
                      onClick={() => handelEdit(el.id)}
                    >
                      <BiEdit />
                    </button>
                  </div>
                </div>
              </div>
              {el.completed ? (
                <div className="text-green-400 m-auto text-3xl border-2 rounded-md p-2">
                  <AiFillCheckSquare />
                </div>
              ) : (
                <div
                  className="text-red-400 m-auto text-3xl border-2 rounded-md p-2"
                  onClick={() => handelcomplete(el.id)}
                >
                  <BsFillExclamationOctagonFill />
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <h1 className="text-red-600 text-center mt-20">!!! No todos found</h1>
      )}
    </div>
  );
};

export default TodoList;
