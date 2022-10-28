import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Task } from "./task";
import { iTask } from "../../components/interface";

export const Main = () => {
  const [taskList, setTaskList] = useState<iTask[] | null>();
  const taskRef = collection(db, "task");

  const getTask = async () => {
    const data = await getDocs(taskRef);
    setTaskList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as iTask[]
    );
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <>
      <div className="mainHeader">
        My Tasks for the upcoming days and weeks.
      </div>
      <div className="mainContent">
        {taskList?.map((task) => (
          <Task task={task} />
        ))}
      </div>
    </>
  );
};
