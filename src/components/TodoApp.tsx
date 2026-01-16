import React, { useEffect, useRef, useState } from "react";
import { categories, statuses, type Category, type status, type Todo } from "./interfaces";
import TodoItem from "./TodoItem";
import { useLocalStorage } from "./useLocalStorage";

export default function TodoApp() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("ma_liste_todo", []);
  const [text, setText] = useState<string>("");
  const [category, setCategory] = useState<Category>("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("");
  const [status, setStatus] = useState<status>("tout");
  const tl =
    " sm:first:rounded-l-2xl max-sm:first:rounded-t-2xl rounded sm:last:rounded-r-2xl max-sm:last:rounded-b-2xl";
  const tl2 = " first:rounded-l-lg rounded last:rounded-r-lg";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim() === "") return;

    const todoItem: Todo = {
      id: crypto.randomUUID(),
      text: text,
      category: category,
      complete: false,
    };

    setTodos([...todos, todoItem]);

    setText("");
    setCategory("");
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  const handleComplete = (id: string) => {
    setTodos(todos.map((todo) => (todo.id == id ? { ...todo, complete: !todo.complete } : todo)));
  };

  const filteredTodos = todos.filter((todo) => {
    const categoryMatch = selectedCategory === "" || todo.category === selectedCategory;

    const statusMatch = status === "tout" || todo.complete === (status === "complet");

    return categoryMatch && statusMatch;
  });

  return (
    <div className="w-full justify-center flex h-screen overflow-hidden overflow-y-scroll bg-neutral-200">
      <div className="flex flex-col w-full max-w-lg font-semibold h-full gap-2">
        <div className="px-4 mt-5">
          <h1 className="sm:text-4xl/10 text-3xl/8 tracking-tighter font-[zodiak] font-medium mb-4">Todo App - 2026</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="hidden px-4 sm:flex gap-1 items-end">
            <input
              className={
                "p-2 text-sm font-medium bg-white w-full h-9 border-none no-scrollbar resize-none outline-none flex-1 leading-tight " +
                tl
              }
              type="text"
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Votre tâche..."
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={"p-2 bg-white min-h-9 text-sm border-none outline-none " + tl}
              required
            >
              <option value="">-- Catégorie --</option>
              {categories.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <input
              className={
                "outline-none border-none min-h-9 px-4 py-2 text-sm bg-neutral-950 hover:bg-neutral-800 cursor-pointer text-white font-semibold " +
                tl
              }
              value="Ajouter"
              type="submit"
            />
          </div>
          <div className="flex px-4 sm:hidden flex-col w-full gap-1 sm:items-start">
            <textarea
              className={
                "p-2 text-sm w-full bg-white font-medium border-none resize-none outline-none flex-1 leading-tight " +
                tl
              }
              value={text}
              rows={3}
              onChange={(e) => setText(e.target.value)}
              placeholder="Votre tâche..."
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={"p-2 bg-white min-h-9 text-sm border-none outline-none " + tl}
              required
            >
              <option value="">-- Catégorie --</option>
              {categories.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <input
              className={
                "outline-none border-none min-h-9 px-4 py-2 text-sm bg-neutral-950 hover:bg-neutral-800 cursor-pointer text-white font-semibold " +
                tl
              }
              value="Ajouter"
              type="submit"
            />
          </div>
        </form>

        <div className="min-h-screen py-2 flex flex-col gap-2">
          <div className="flex px-4 sm:justify-between w-full sm:items-center flex-col gap-1 z-20 sm:flex-row">
            <div className="p-1 flex justify-stretch rounded-xl bg-black/5">
              <button
                onClick={() => setSelectedCategory("")}
                className={
                  "cursor-pointer px-4 capitalize flex-1 py-1 text-sm font-semibold " +
                  (selectedCategory === "" ? " bg-white" : "hover:bg-black/5") +
                  tl2
                }
              >
                Tout
              </button>
              {categories.map((categ, index) => (
                <button
                  key={index}
                  className={
                    "cursor-pointer capitalize px-4 flex-1 py-1 text-sm font-semibold " +
                    (categ === selectedCategory ? " bg-white" : " hover:bg-black/5") +
                    tl2
                  }
                  onClick={() => setSelectedCategory(categ)}
                >
                  {categ}
                </button>
              ))}
            </div>
            <select
              onChange={(e) => setStatus(e.target.value as status)}
              className={
                "cursor-pointer capitalize outline-none border-none px-4 py-2 text-sm font-semibold  bg-white rounded-xl"
              }
            >
              {statuses.map((stat, index) => (
                <option key={index} value={stat}>
                  {stat === "tout" ? "-- aucun filtre --" : stat}
                </option>
              ))}
            </select>
          </div>

          <div className="px-4 overflow-hidden">
            <div className="rounded-2xl overflow-hidden no-scrollbar overflow-y-scroll max-h-full ">
              <div className="flex flex-col h-full gap-0.5">
                {filteredTodos.length > 0 ? (
                  filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} onComplete={handleComplete} />
                  ))
                ) : (
                  <div className="rounded-2xl border-2 border-dashed border-black/10 py-5">
                    <p className="text-sm font-semibold text-neutral-500 text-center">
                      {selectedCategory == ""
                        ? "Aucune tâche disponible"
                        : `Aucune tâche pour la catégorie "${selectedCategory}"`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
