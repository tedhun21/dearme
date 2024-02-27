"use client";

import { todoListState } from "@/store/atoms";
import { filteredTodoListSelector } from "@/store/selectors";
import { getCookie } from "@/util/tokenCookie";

import axios from "axios";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Component1 from "./test/comOne";
import Component2 from "./test/comTwo";

const access_token = getCookie("access_token");
export default function Test() {
  const setTodos = useSetRecoilState(todoListState);

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
      {/* <Component2 /> */}
      {/* <Suspense fallback={<div>hi</div>}>
        <Component3 />
      </Suspense> */}
    </div>
  );
}

// async function Component3() {
//   await new Promise((resolve) => setTimeout(resolve, 10000));
//   const res = await fetch(`http://localhost:1337/api/users/1`);
//   const data = await res.json();

//   return (
//     <div>
//       <span>3 {data.username}</span>
//     </div>
//   );
// }

/// client component 하위로 서버 컴포넌트는 안 만들어짐(무한 루프)
/// recocil atom은 무결, selector로 조합하여 return하는 새로운 데이터 형태를 보여줄 수도 있음
