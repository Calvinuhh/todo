import Swal from "sweetalert2";

interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface ListProps {
  todos: Todo[];
  loading: boolean;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onEdit: (id: string, title: string, description?: string) => void;
}

export default function List({
  todos,
  loading,
  onDelete,
  onComplete,
  onEdit,
}: ListProps) {
  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-gray-600 text-center">Loading your tasks...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-500 text-center text-lg font-medium">
          📋 You don't have any pending tasks. Add some and organize your day!
          🚀
        </p>
      ) : (
        <div className="max-h-[600px] overflow-y-auto p-2 border border-gray-300 rounded-lg">
          <ul className="space-y-4">
            {pendingTodos.map((todo) => (
              <li
                key={todo._id}
                className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 flex justify-between items-center"
              >
                <div className="max-w-[70%]">
                  <h3 className="text-lg font-semibold text-gray-900 break-words truncate max-w-full">
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className="text-gray-600 mt-1 break-words whitespace-normal">
                      {todo.description}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onComplete(todo._id)}
                    className="text-green-500 hover:text-green-700 cursor-pointer transition duration-200 ease-in-out hover:scale-[1.1]"
                    aria-label="Mark as Completed"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      Swal.fire({
                        title: "Edit To-Do",
                        html: `
                          <input id="swal-input-title" class="swal2-input" placeholder="Title" value="${
                            todo.title
                          }" required>
                          <textarea id="swal-input-description" class="swal2-textarea" placeholder="Description">${
                            todo.description || ""
                          }</textarea>
                          <p id="swal-error-message" class="text-red-500 text-sm mt-2 hidden">
                            You haven't modified the fields.
                          </p>
                        `,
                        focusConfirm: false,
                        preConfirm: () => {
                          const title = (
                            document.getElementById(
                              "swal-input-title"
                            ) as HTMLInputElement
                          ).value.trim();
                          const description = (
                            document.getElementById(
                              "swal-input-description"
                            ) as HTMLTextAreaElement
                          ).value.trim();

                          if (
                            title === todo.title &&
                            description === (todo.description || "")
                          ) {
                            const errorMessage = document.getElementById(
                              "swal-error-message"
                            ) as HTMLElement;
                            errorMessage.classList.remove("hidden");
                            return false; // Prevent closing the Swal
                          }

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
                      }).then((result) => {
                        if (result.isConfirmed && result.value) {
                          const { title, description } = result.value;
                          onEdit(todo._id, title, description);
                        }
                      })
                    }
                    className="text-yellow-500 hover:text-yellow-600 cursor-pointer transition duration-200 ease-in-out hover:scale-[1.1]"
                    aria-label="Edit To-Do"
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
                        d="M12 20h9M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {completedTodos.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mt-6">
                Completed
              </h2>
              <ul className="space-y-4 mt-2">
                {completedTodos.map((todo) => (
                  <li
                    key={todo._id}
                    className="bg-gray-300 shadow-lg rounded-xl p-4 border border-gray-300 flex justify-between items-center"
                  >
                    <div className="max-w-[80%]">
                      <h3 className="text-lg font-semibold text-gray-700 break-words truncate max-w-full">
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className="text-gray-500 mt-1 break-words whitespace-normal">
                          {todo.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onDelete(todo._id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer transition duration-200 ease-in-out hover:scale-[1.1]"
                      aria-label="Eliminar To-Do"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
