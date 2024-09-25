import React from "react";
import { IUser } from "../types";

interface UserCardProps {
  user: IUser;
  onDelete: (id: number) => void;
  onEdit: (user: IUser) => void; // Add onEdit prop
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete, onEdit }) => {
  return (
    <div className="border p-4 rounded shadow-sm flex justify-between items-center">
      <div>
        <p className="text-lg font-bold">{user.name}</p>
        <p className="text-sm">{user.email}</p>
        <p className="text-sm">{user.phone}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(user)}
          className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
