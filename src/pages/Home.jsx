import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/");

        if (!response.ok) {
          throw new error("Error While fetching data!" + response.statusText);
        }
        const data = await response.json();

        setTodos(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }

    fetchdata();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new error("Response Got Eroor" + response.statusText);
      }

      setTodos((prev) => prev.filter((todo) => todo.id != id));
    } catch (error) {
      console.log("Error" + error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 text-white text-center text-2xl font-bold">
        My To-Do App
      </header>

      {/* Redesigned Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">
            Stay Organized with Your Tasks
          </h1>
          <p className="text-lg mb-8">
            Track, manage, and complete your tasks with ease. Take control of
            your productivity today!
          </p>
          <Link
            key="1"
            to="/add"
            className="bg-white text-blue-600 px-6 py-2 font-semibold rounded-lg shadow-md hover:bg-gray-100"
          >
            Add Todo
          </Link>
        </div>
      </section>

      {/* To-Do Items Section with Table */}
      <section className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Task</th>
                <th className="py-3 px-6 text-left">Body</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {todos.map((todo, index) => (
                <tr
                  key={todo.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 text-left">{todo.title}</td>
                  <td className="py-3 px-6 text-left">{todo.body}</td>
                  <td className="py-3 px-6 text-left">
                    <button
                      className=" text-red-700"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </button>
                    <p> </p>
                    <Link
                      className=" text-green-500"
                      to={`/edit/${todo.id}`}
                      state={todo}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 text-white text-center">
        &copy; 2024 My To-Do App. All rights reserved.
      </footer>
    </div>
  );
}
