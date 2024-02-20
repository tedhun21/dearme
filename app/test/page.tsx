"use client";

import { filter, todoListState } from "@/store/atoms";
import { filteredTodoListSelector } from "@/store/selectors";
import { getCookie } from "@/util/tokenCookie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const access_token = getCookie("access_token");
export default function Test() {
  const [currentStep, setCurrentStep] = useState(1);
  const setTodos = useSetRecoilState(todoListState);
  const setFilter = useSetRecoilState(filter);

  const filtered = useRecoilValue(filteredTodoListSelector);

  const fetchTodos = async () => {
    const { data } = await axios.get(
      "http://localhost:1337/api/todos?date=2024-02-14",
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  console.log(filtered);
  return (
    <div>
      <Component1 />
      <Component2 />
      <Suspense fallback={<div>hi</div>}>
        <Component3 />
      </Suspense>
    </div>
  );
}

async function Component2() {
  const res = await fetch(`http://localhost:1337/api/users/1`);
  const data = await res.json();

  return (
    <div>
      <span>2 {data.username}</span>
    </div>
  );
}

async function Component3() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const res = await fetch(`http://localhost:1337/api/users/1`);
  const data = await res.json();

  return (
    <div>
      <span>3 {data.username}</span>
    </div>
  );
}
