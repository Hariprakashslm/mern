"use client";
import styles from "./page.module.css";
import { useActionState, useCallback, useEffect, useState } from "react";

interface IUser {
  name: string;
  dob: string;
  role: string;
  file: File;
  fileId?: string;
}

function UserForm({
  onUserAdd,
}: {
  onUserAdd: (prevState: any, queryData: FormData) => void;
}) {
  const [message, formAction, isPending] = useActionState(onUserAdd, null);
  return (
    <form action={formAction}>
      <div>
        <label htmlFor="user-name">Name:</label>{" "}
        <input type="text" name="name" id="user-name" />
      </div>
      <div>
        <label htmlFor="user-dob">DOB:</label>{" "}
        <input type="date" name="dob" id="user-dob" />
      </div>
      <div>
        <label htmlFor="user-role">Role:</label>{" "}
        <input type="text" name="role" id="user-role" />
      </div>
      <div>
        <label htmlFor="user-role">Role:</label>{" "}
        <input type="file" name="file" id="user-role" />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
export default function Home() {
  const [users, setUser] = useState<IUser[]>([]);

  const onUserAdd = useCallback(
    async (prevState1: any, queryData: FormData) => {
      const user: IUser = {
        name: queryData.get("name") as string,
        dob: queryData.get("dob") as string,
        role: queryData.get("role") as string,
        file: queryData.get("file") as File,
      };
      const rawResponse = await fetch("http://localhost:4000/users", {
        method: "POST",
        body: queryData,
      });
      const content = await rawResponse.json();
      console.log("created response => ", content);
      if (content._id) {
        getUsers();
      }
    },
    []
  );

  const getUsers = () => {
    fetch(`http://localhost:4000/users`)
      .then((data) => data.json())
      .then((data) => setUser(data.data));
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className={styles.page}>
      <UserForm onUserAdd={onUserAdd} />
      <table>
        <thead>
          <tr>
            <th> Name</th>
            <th>DOB</th>
            <th>Role</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.dob}</td>
                <td>{user.role}</td>
                <td>{user.fileId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
