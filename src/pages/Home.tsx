import { useEffect, useState } from "react";
import { IUser } from "../types";
import axios from "axios";
import { Spinner } from "../components/Spinner";
import { CreateUserForm } from "../components/CreateUserForm";
import EditUserForm from "../components/EditUserForm";
import UserCard from "../components/UserCard";

export const Home: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        localStorage.setItem("users", JSON.stringify(response.data));
      } catch (error) {
        console.error("Couldnt fetch the users", error);
      } finally {
        setLoading(false);
      }
    };

    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
      setLoading(false);
    } else {
      fetchUsers();
    }
  }, []);

  const handleCreateUser = (user: Omit<IUser, "id">) => {
    const newUser: IUser = { id: users.length + 1, ...user };

    const updateUsers = [...users, newUser];
    setUsers(updateUsers);
    localStorage.setItem("users", JSON.stringify(updateUsers));
    setUsers([...users, { id: users.length + 1, ...user }]);
  };
  const handleEditUser = (updatedUser: IUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditingUser(null); // Exit edit mode
  };
  const handleEditButtonClick = (user: IUser) => {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteUser = (id: number) => {
    const updateUsers = users.filter((user) => user.id !== id);
    setUsers(updateUsers);
    localStorage.setItem("users", JSON.stringify(updateUsers));
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {editingUser ? (
          <EditUserForm user={editingUser} onEdit={handleEditUser} />
        ) : (
          <CreateUserForm onCreate={handleCreateUser} />
        )}
        <div className="grid gap-4 mt-6">
          {users
            .slice()
            .reverse()
            .map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={handleDeleteUser}
                onEdit={handleEditButtonClick} // Pass the edit function
              />
            ))}
        </div>
      </div>
    </div>
  );
};
