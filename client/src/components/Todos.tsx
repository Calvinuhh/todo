import { useState, useEffect } from "react";
import List from "./List";
import LogoutBtn from "./LogoutBtn";
import Swal from "sweetalert2";

export default function Todos() {
  interface Todo {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/todos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "There was a problem with your connection. Please check your internet connection and try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add new To-Do",
      html: `
        <input id="swal-input-title" class="swal2-input" placeholder="Título (obligatorio)" required>
        <textarea id="swal-input-description" class="swal2-textarea" placeholder="Descripción (opcional)"></textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const title = (
          document.getElementById("swal-input-title") as HTMLInputElement
        ).value.trim();
        const description = (
          document.getElementById(
            "swal-input-description"
          ) as HTMLTextAreaElement
        ).value.trim();

        if (!title) {
          Swal.showValidationMessage("Title is required");
          return null;
        }

        if (title.length > 100) {
          Swal.showValidationMessage(
            "Title must be at most 100 characters long"
          );
          return null;
        }

        if (description.length > 500) {
          Swal.showValidationMessage(
            "Description must be at most 500 characters long"
          );
          return null;
        }

        return { title, description };
      },
    });

    if (formValues) {
      try {
        const { title, description } = formValues;
        const body: { title: string; description?: string } = { title };
        if (description) {
          body.description = description;
        }

        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/todos`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          }
        );

        if (response.ok) {
          const newTodo: Todo = await response.json();
          setTodos((prevTodos) => [...prevTodos, newTodo]);
        } else {
          const errorData = await response.json();
          Swal.fire("Error", errorData.message, "error");
        }
      } catch (error) {
        Swal.fire("Error", "Hubo un problema con el servidor", "error");
      }
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const confirm = await Swal.fire({
      title: "You're sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/todos/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        } else {
          const errorData = await response.json();
          Swal.fire("Error", errorData.message, "error");
        }
      } catch (error) {
        Swal.fire("Error", "Hubo un problema con el servidor", "error");
      }
    }
  };

  const handleCompleteTodo = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ completed: true }),
        }
      );

      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: true } : todo
          )
        );
      } else {
        const errorData = await response.json();
        Swal.fire("Error", errorData.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "There was a problem with the server", "error");
    }
  };

  const handleEditTodo = async (
    id: string,
    title: string,
    description?: string
  ) => {
    const existingTodo = todos.find((todo) => todo._id === id);

    if (
      existingTodo &&
      existingTodo.title === title &&
      existingTodo.description === description
    ) {
      Swal.showValidationMessage("You haven't modified the fields.");
      return;
    }

    const updatedFields: Partial<{ title: string; description?: string }> = {};
    if (existingTodo?.title !== title) updatedFields.title = title;
    if (description?.trim()) {
      if (existingTodo?.description !== description) {
        updatedFields.description = description;
      }
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFields),
        }
      );

      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, ...updatedFields } : todo
          )
        );
      } else {
        const errorData = await response.json();
        Swal.fire("Error", errorData.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "There was a problem with the server", "error");
    }
  };

  return (
    <div className="font-sans w-[800px] mx-auto p-6 bg-white shadow-md rounded-lg">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">To-Do List</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleAddTodo}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer transition duration-200 ease-in-out hover:scale-[1.1]"
            aria-label="Agregar To-Do"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <LogoutBtn />
        </div>
      </header>
      <main className="mt-5">
        <List
          todos={todos}
          loading={loading}
          onDelete={handleDeleteTodo}
          onComplete={handleCompleteTodo}
          onEdit={handleEditTodo}
        />
      </main>
    </div>
  );
}
