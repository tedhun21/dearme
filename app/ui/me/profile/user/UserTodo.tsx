"use client";

import { useQuery } from "@tanstack/react-query";
import TodoRate from "../../plans/TodoRate";
import { getUserTodosWithDate } from "@/store/api";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "@/store/atoms";
import { getToday } from "@/util/date";

export default function UserTodo() {
  return <TodoRate />;
}
