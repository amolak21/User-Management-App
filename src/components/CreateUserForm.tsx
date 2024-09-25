import { useState } from "react";
import { IUser } from "../types";

interface CreateUserFormProps {
  onCreate: (user: Omit<IUser, "id">) => void;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({ onCreate }) => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone } = user;
    onCreate({ name, email, phone });
    setUser({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        className="border mb-2 p-2"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="email"
        className="border mb-2 p-2"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="tel"
        className="border mb-2 p-2"
        placeholder="Phone"
        value={user.phone}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Create
      </button>
    </form>
  );
};
