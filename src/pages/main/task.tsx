import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { iProps, iSuccess, iTask } from "../../components/interface";
import { auth, db } from "../../config/firebase";

export const Task = (props: iProps) => {
  const { task } = props;
  const [user] = useAuthState(auth);

  const [success, setSuccess] = useState<iSuccess[] | null>(null);

  const successRef = collection(db, "success");
  const successDoc = query(successRef, where("taskId", "==", task.id));

  const getSuccess = async () => {
    const data = await getDocs(successDoc);
    setSuccess(
      data.docs.map((doc) => ({ userId: doc.data().userId, successId: doc.id }))
    );
  };

  const changeSuccess = async () => {
    try {
      const newDoc = await addDoc(successRef, {
        userId: user?.uid,
        taskId: task.id,
      });
      if (user) {
        setSuccess((prev) =>
          prev
            ? [...prev, { userId: user.uid, successId: newDoc.id }]
            : [{ userId: user.uid, successId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeSuccess = async () => {
    try {
      const successCancelQuery = query(
        successRef,
        where("taskId", "==", task.id),
        where("userId", "==", user?.uid)
      );

      const successCancelData = await getDocs(successCancelQuery);
      const successId = successCancelData.docs[0].id;

      const successCancel = doc(db, "success", successId);
      await deleteDoc(successCancel);
      if (user) {
        setSuccess(
          (prev) =>
            prev && prev.filter((success) => success.successId !== successId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserCompleted = success?.find(
    (success) => success.userId === user?.uid
  );

  useEffect(() => {
    getSuccess();
  }, []);

  const deleteTask = async () => {
    try {
      await deleteDoc(doc(db, "task", task.id));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={user && user.uid === task.userId ? "task" : ""}>
      {user && (
        <>
          <h1 className={hasUserCompleted ? "successTask" : ""}>
            {hasUserCompleted ? <span>success</span> : ""}
            {user.uid === task.userId ? task.title : ""}
          </h1>
          <p>{user.uid === task.userId ? task.description : ""}</p>
          <div
            className={user && user.uid === task.userId ? "taskManager" : ""}
          >
            {user && (
              <>
                {user.uid === task.userId ? (
                  <button
                    onClick={hasUserCompleted ? removeSuccess : changeSuccess}
                    className={hasUserCompleted ? "unSuccess" : "success"}
                  >
                    {hasUserCompleted ? "Unsuccess" : "Success"}
                  </button>
                ) : (
                  ""
                )}
                {user.uid === task.userId ? (
                  <button className="delete" onClick={deleteTask}>
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
