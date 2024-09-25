import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../types";
import axios from "axios";
import { Spinner } from "./Spinner";

export const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <Spinner />;
  if (!user) return <div>User not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{user.name}</h1>
      <p>Email :{user.name}</p>
      <p>Phone :{user.phone}</p>
    </div>
  );
};
