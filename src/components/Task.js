import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { markDone } from "../utils/api";

const Task = ({ task, apiToken, updateTasks }) => {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = () => {
    setIsLoading(true);
    markDone(apiToken, task["_id"]).then((id) => {
      updateTasks(id)
      setIsLoading(false)
    });
  };

  return (
    <li className="flex items-center gap-3 px-2 py-3 hover:bg-neutral-50 text-base">
      {isLoading ? (
        <LoadingSpinner height="h-5" width="w-5" />
      ) : (
        <input
          type="checkbox"
          checked={checked}
          className="checkbox checkbox-primary"
          onChange={handleChange}
          onMouseEnter={() => {
            setChecked(true);
          }}
          onMouseLeave={() => {
            setChecked(false);
          }}
        />
      )}
      <label>{task.title}</label>
    </li>
  );
};

export default Task;
