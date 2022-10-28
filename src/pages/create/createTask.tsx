import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { iTaskData } from "../../components/interface";

export const CreateTask = () => {
  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title!"),
    description: yup.string().required("You must add a description!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iTaskData>({
    resolver: yupResolver(schema),
  });

  const taskRef = collection(db, "task");

  const navigate = useNavigate();

  const onCreateTask = async (data: iTaskData) => {
    await addDoc(taskRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onCreateTask)}>
      <h1>Create a new Task</h1>
      <div className="inputField">
        <input
          className="postTitle"
          placeholder="Title..."
          {...register("title")}
        />
        <p style={{ color: "red" }}>{errors.title?.message}</p>
        <textarea placeholder="Description..." {...register("description")} />
        <p style={{ color: "red" }}>{errors.description?.message}</p>
        <input type="submit" />
      </div>
    </form>
  );
};
