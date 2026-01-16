import React, { useState } from "react";
import { categories, statuses, type Category, type status, type Todo } from "./interfaces";
import TodoItem from "./TodoItem";
import { useLocalStorage } from "./useLocalStorage";

export default function TodoApp() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("ma_liste_todo", []);
  const [text, setText] = useState<string>("");
  const [category, setCategory] = useState<Category>("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("");
  const [status, setStatus] = useState<status>("all");
  const tl = " first:rounded-l-2xl rounded last:rounded-r-2xl";
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

    const statusMatch = status === "all" || todo.complete === (status === "completed");

    return categoryMatch && statusMatch;
  });

  return (
    <div className="w-full justify-center flex overflow-hidden h-screen bg-neutral-200 pt-10">
      <div className="flex flex-col w-full max-w-lg font-semibold h-full gap-3">
        <h1 className="text-4xl/5 tracking-tighter font-[zodiak] font-medium mb-6">Todo App - 2026</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-1">
            <input
              className={"p-2 bg-white text-sm border-none outline-none flex-1 " + tl}
              autoFocus
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Entrez le nom de la tâche"
              required
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={"p-2 bg-white text-sm border-none outline-none " + tl}
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
                "outline-none border-none px-4 py-2 text-sm bg-neutral-950 hover:bg-neutral-800 cursor-pointer text-white font-semibold " +
                tl
              }
              value="Ajouter"
              type="submit"
            />
          </div>
        </form>

        <div className="flex flex-col h-full overflow-y-auto mb-5 gap-1">
          <div className="flex justify-between w-full items-center">
            <div className="p-1 rounded-xl bg-black/5">
              <button
                onClick={() => setSelectedCategory("")}
                className={
                  "cursor-pointer px-4 py-1 text-sm font-semibold " +
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
                    "cursor-pointer px-4 py-1 text-sm font-semibold " +
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
              className={"cursor-pointer outline-none border-none px-4 py-2 text-sm font-semibold  bg-white rounded-xl"}
            >
              {statuses.map((stat, index) => (
                <option key={index} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col rounded-2xl h-full overflow-y-auto max-h-full gap-0.5 no-scrollbar">
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
  );
}
