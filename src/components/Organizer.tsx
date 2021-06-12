import React from "react";
import dayjs from "dayjs";

import "./Organizer.css";
import { Context } from "..";
import { DATE_FORMAT } from "../constants";

type Props = {
  selectedDate: dayjs.Dayjs;
};

export default function Organizer({ selectedDate }: Props) {
  const { auth, firestore } = React.useContext(Context);
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [taskName, setTaskName] = React.useState("");

  const uid = auth.currentUser?.uid;

  React.useEffect(() => {
    if (!uid) return;
    return firestore
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .where("date", "==", selectedDate.format("DD-MM-YYYY"))
      .onSnapshot((querySnapshot) => {
        const tasks: any[] = [];
        querySnapshot.forEach((doc) => {
          tasks.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTasks(tasks);
      });
  }, [firestore, uid, selectedDate]);

  const handleTaskNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTaskName(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    firestore
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .add({
        name: taskName,
        date: selectedDate.format(DATE_FORMAT),
      })
      .then(() => {
        setTaskName("");
      });
  };

  const handleRemoveTask = async (taskId: string) => {
    await firestore
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .doc(taskId)
      .delete();
  };

  return (
    <section>
      <header>
        Organizer: <strong>{selectedDate.format(DATE_FORMAT)}</strong>
        <hr />
      </header>
      <main>
        {tasks.length ? (
          <ul>
            {tasks.map((task: any, index) => (
              <li className="task" key={task.id}>
                <span>
                  <strong>{index + 1}</strong>
                  <span className="task-name">{task.name}</span>
                </span>
                <button
                  className="btn btn-primary"
                  onClick={() => handleRemoveTask(task.id)}
                >
                  Șterge
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">Fără sarcini...</p>
        )}
      </main>
      <footer>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="taskName"
            onChange={handleTaskNameChange}
            value={taskName}
          />
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={!taskName}
          >
            Adaugă
          </button>
        </form>
      </footer>
    </section>
  );
}
