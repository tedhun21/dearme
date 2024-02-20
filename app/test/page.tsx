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
      {currentStep === 1 && <div>안녕하세요1</div>}
      {currentStep === 2 && <div>안녕하세요2</div>}
      {currentStep === 3 && <div>안녕하세요3</div>}
      {currentStep === 4 && <div>안녕하세요4</div>}

      <div>
        <button className="bg-red h-5 w-5" onClick={() => setFilter("done")}>
          1
        </button>
        <button onClick={() => setCurrentStep(2)}>2</button>
        <button onClick={() => setCurrentStep(3)}>3</button>
        <button onClick={() => setCurrentStep(4)}>4</button>
      </div>
    </div>
  );
}
