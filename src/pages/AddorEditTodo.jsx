import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddorEditTodo() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [todoId, setTodoId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const todo = location.state || {};
    if (todo) {
      setFormData({
        title: todo.title,
        body: todo.body,
      });
    }
    setTodoId(todo.id);
  }, [location.state]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const sendData = async (e) => {
    e.preventDefault();

    const method = todoId ? "PUT" : "POST";
    const url = todoId
      ? `http://127.0.0.1:8000/api/update/${todoId}`
      : "http://127.0.0.1:8000/api/create/";

    const response = await fetch(url, {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      navigate("/");
    } else {
      console.log("error!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
          {todoId ? "Update To-Do" : "Add New To-Do"}
        </h2>
        <form action="" method="post" onSubmit={sendData}>
          {/* Title Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Body Input */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="body"
            >
              Body
            </label>
            <textarea
              id="body"
              value={formData.body}
              name="body"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"
              rows="4"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            {todoId ? "Update" : "Add To-Do"}
          </button>
        </form>
      </div>
    </div>
  );
}
