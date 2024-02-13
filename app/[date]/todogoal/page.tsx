"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import PlusIcon from "@/public/todo/PlusIcon";
import XIcon from "@/public/todo/XIcon";
import {
  ISetting,
  goalListState,
  settingState,
  todoListState,
} from "@/store/atoms";
import CalendarIcon from "@/public/todogoal/CalendarIcon";
import Footer from "@/app/ui/footer";
import { createMyTodo, getMyGoals, getMyTodosWithDate } from "@/store/api";

import TodogoalHeader from "@/app/ui/todogoal/TodogoalHeader";
import TodogoalDragTodo from "@/app/ui/todogoal/todo/TodogoalDragTodo";
import TodogoalGoalList from "@/app/ui/todogoal/goal/TodogoalGoalList";
import TodogoalCreateTodo from "@/app/ui/todogoal/todo/CreateTodo";
import TodogoalPropgress from "@/app/ui/todogoal/todo/TodoProgress";
import GoalProgress from "@/app/ui/todogoal/goal/GoalProgress";
import GoalModal from "@/app/ui/todogoal/goal/GoalModal";
import Link from "next/link";
import { getToday } from "@/util/date";

export default function DailyTodoGoal() {
  const router = useRouter();

  // TODO || GOAL
  const [{ todogoalTitle, todogoalDate }, setSetting] =
    useRecoilState<ISetting>(settingState);

  // url에 적힌 date
  const { date } = useParams<{ date: string }>();

  // create Goal Modal
  const [modalCreateGoalOpen, setModalCreateGoalOpen] = useState(false);

  const [todos, setTodos] = useRecoilState(todoListState);
  const [goals, setGoals] = useRecoilState(goalListState);

  const DdayGoal = goals?.filter((goal) => goal.endDate === date);

  // get todos
  const {
    isSuccess: isTodoSuccess,
    data: todoData,
    refetch: refetchTodo,
    isRefetching: isTodoRefetching,
  } = useQuery({
    queryKey: ["getMyTodosWithDate"],
    queryFn: () =>
      getMyTodosWithDate({ date: dayjs(todogoalDate).format("YYYY-MM-DD") }),
  });

  // get goals
  const {
    isSuccess: isGoalSuccess,
    data: goalData,
    refetch: refetchGoal,
    isRefetching: isGoalRefetching,
  } = useQuery({
    queryKey: ["getMyGoals"],
    queryFn: () =>
      getMyGoals({ date: dayjs(todogoalDate).format("YYYY-MM-DD") }),
  });

  // ABOUT: create Todo
  const [createInput, setCreateInput] = useState<boolean>(false);

  const { mutate: createTodoMutate } = useMutation({
    mutationKey: ["createMyTodo"],
    mutationFn: createMyTodo,
  });

  useEffect(() => {
    setSetting((prev) => ({ ...prev, todogoalDate: dayjs(date) }));
  }, [date]);

  useEffect(() => {
    setCreateInput(false);
  }, [todogoalTitle]);

  // ABOUT: get todos
  useEffect(() => {
    if (isTodoSuccess || !isTodoRefetching) {
      setTodos(todoData);
    }
  }, [isTodoSuccess, isTodoRefetching]);

  useEffect(() => {
    if (!isTodoRefetching && todogoalDate) {
      refetchTodo();
    }
    if (!isGoalRefetching && todogoalDate) {
      refetchGoal();
    }
  }, [todogoalDate, todogoalTitle]);

  // ABOUT: get goals
  useEffect(() => {
    if (isGoalSuccess || !isGoalRefetching) {
      setGoals(goalData);
    }
  }, [isGoalSuccess, isGoalRefetching]);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-black pb-28 text-white shadow-lg">
        <article className="flex flex-col gap-5 p-5">
          <TodogoalHeader />
          <section className="flex flex-col gap-2">
            <div className="w-full rounded-3xl bg-default-800 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CalendarIcon className="h-5 w-5 fill-current text-white" />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={["day"]}
                      value={todogoalDate}
                      onChange={(newValue: any) => {
                        setSetting((prev) => ({
                          ...prev,
                          todogoalDate: newValue,
                        }));
                        router.push(
                          `/${dayjs(newValue).format("YYYY-MM-DD")}/todogoal`,
                        );
                      }}
                      minDate={dayjs(date).subtract(1, "month")}
                      maxDate={dayjs(date).add(1, "month")}
                      sx={{
                        width: "100px",
                        borderColor: "#ffffff",
                        "& .MuiInputBase-root": {
                          color: "#ffffff",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <button
                  onClick={() => {
                    router.push(`/${getToday()}/todogoal`);
                    setSetting((prev) => ({
                      ...prev,
                      todogoalDate: dayjs(getToday()),
                    }));
                  }}
                  className="rounded-2xl bg-default-300 px-3 py-1 text-default-700 hover:bg-default-500 active:bg-default-900"
                >
                  <span className="font-semibold hover:text-black">Today</span>
                </button>
              </div>
              <div className="flex flex-col text-2xl font-bold">
                <span>You have</span>
                {todogoalTitle === "Todo" ? (
                  <span>
                    {todos?.length} {todos?.length > 1 ? "tasks" : "task"} for{" "}
                    {date}
                  </span>
                ) : (
                  <span>
                    {goals?.length}{" "}
                    {goals?.length > 1 ? "objectives" : "objective"} for {date}
                  </span>
                )}
              </div>
              <div className="mb-3 mt-5 h-0.5 bg-white" />
              <div className="flex gap-5 text-default-300">
                <span>#planning</span>
                <span>#challenge</span>
                <span>#youthfulness</span>
              </div>
            </div>
            {/* 섹션 2: todo/goal progress */}
            {todogoalTitle === "Todo" ? (
              <TodogoalPropgress />
            ) : (
              DdayGoal?.length > 0 && <GoalProgress />
            )}
            {/* 섹션 3: togo/goal list */}
            {todogoalTitle === "Todo" &&
            Array.isArray(todos) &&
            todos.length > 0 ? (
              <TodogoalDragTodo date={date} />
            ) : (
              todogoalTitle === "Goal" &&
              Array.isArray(goals) &&
              goals.length > 0 && (
                <TodogoalGoalList
                  date={date}
                  setModalCreateGoalOpen={setModalCreateGoalOpen}
                />
              )
            )}
            {/* 섹션 4: plus button  */}
            {todogoalTitle === "Todo" ? (
              // Create Todo
              <TodogoalCreateTodo
                date={date}
                createInput={createInput}
                setCreateInput={setCreateInput}
                createTodoMutate={createTodoMutate}
              />
            ) : (
              <div className="flex w-full flex-col items-center gap-4">
                {/* plus button */}
                <div className="group flex h-12 w-12 items-center justify-center p-1 transition-all duration-200 hover:p-0 active:p-2">
                  <button
                    onClick={() => setModalCreateGoalOpen(true)}
                    className="h-full w-full rounded-full bg-default-600 p-2 duration-200 group-hover:h-12 group-hover:w-12 group-hover:bg-default-400 group-active:h-8 group-active:w-8"
                  >
                    {modalCreateGoalOpen ? (
                      <XIcon color="white" />
                    ) : (
                      <PlusIcon />
                    )}
                  </button>
                </div>

                {/* Create Goal */}
                <GoalModal
                  type="create"
                  date={date}
                  modalOpen={modalCreateGoalOpen}
                  setModalOpen={setModalCreateGoalOpen}
                />
              </div>
            )}
          </section>
        </article>

        <Footer />
      </div>
    </main>
  );
}
