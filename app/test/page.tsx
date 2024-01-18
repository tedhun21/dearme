"use client";

import { todoListState } from "@/store/atoms";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

import { useRecoilState } from "recoil";

const API_URL = process.env.API_URL;

export default function Test() {
  const [todos, setTodos] = useRecoilState<any>(todoListState);

  const getTodos = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/todos/2024-01-04`);
      setTodos(data);
    } catch (e) {}
  };
  const { data } = useQuery({
    queryKey: ["getTodos"],
    queryFn: () => getTodos,
  });

  console.log(todos);

  return (
    <div>
      {todos?.result?.map((todo: any) => <div key={todo.id}>{todo.body}</div>)}
    </div>
  );
}
