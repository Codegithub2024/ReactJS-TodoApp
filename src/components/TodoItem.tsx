import { Bookmark, CircleCheck, CircleCheckBig, Trash2 } from "lucide-react";
import type { Todo } from "./interfaces";

type Props = {
  todo: Todo;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
};

export default function TodoItem({ todo, onDelete, onComplete }: Props) {
  const ui = {
    complete: "bg-black text-white",
    incomplete: "hover:bg-black/10 text-black",
  };

  return (
    <div key={todo.id} className="px-2 pb-2  bg-white first:rounded-t-2xl rounded last:rounded-b-2xl relative">
      <div className="absolute right-2 top-2 flex justify-center items-center gap-1">
        <button
          className="rounded-full cursor-pointer hover:bg-black/10 size-6 flex justify-center items-center "
          onClick={() => onDelete(todo.id)}
        >
          <Trash2 size={12} />
        </button>
        <button
          onClick={() => onComplete(todo.id)}
          className={
            "rounded-full cursor-pointer size-6 flex justify-center items-center " +
            (todo.complete ? ui.complete : ui.incomplete)
          }
        >
          {todo.complete ? <CircleCheckBig size={12} /> : <CircleCheck size={12} />}
        </button>
      </div>
      <span
        className={
          "absolute left-2 top-2 text-[10px]/2 p-1 px-2 rounded-full bg-yellow-900/10 font-medium uppercase " +
          (todo.complete ? "line-through text-neutral-300" : " text-neutral-700 ")
        }
      >
        {todo.category}
      </span>
      <div>
        <p
          className={
            "text-sm/5 line-clamp-4 mt-8 hyphens-auto " +
            (todo.complete ? "line-through text-neutral-300" : " text-neutral-700 ")
          }
        >
          {todo.text}
        </p>
      </div>
    </div>
  );
}
