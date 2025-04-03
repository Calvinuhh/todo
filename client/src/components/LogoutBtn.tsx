export default function LogoutBtn() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer transition duration-200 ease-in-out hover:scale-[1.1]"
    >
      Logout
    </button>
  );
}
