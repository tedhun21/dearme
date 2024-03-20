import { useRecoilState } from "recoil";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Modal } from "@mui/joy";
import { Switch } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import XIcon from "@/public/todo/XIcon";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createMyGoal, deleteMyGoal, updateMyGoal } from "@/store/api";
import { goalListState } from "@/store/atoms";

export default function GoalModal({
  type,
  goal,
  date,
  modalOpen,
  setModalOpen,
}: any) {
  const [goals, setGoals] = useRecoilState(goalListState);

  const {
    register: createGoalRegister,
    control,
    handleSubmit,
    getValues,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      title: goal && type === "edit" ? goal.title : "",
      body: goal && type === "edit" ? goal.body : "",
      startDate: goal && type === "edit" ? dayjs(goal.startDate) : dayjs(date),
      endDate: goal && type === "edit" ? dayjs(goal.endDate) : dayjs(date),
      isPublic: goal && type === "edit" ? goal.isPublic : true,
    },
  });

  const { startDate } = getValues();

  // create Goal mutation
  const { mutate: createGoalMutate } = useMutation({
    mutationKey: ["createMyGoal"],
    mutationFn: createMyGoal,
    onSuccess: (data) => {
      reset({
        title: "",
        body: "",
        startDate: dayjs(date),
        endDate: dayjs(date),
        isPublic: true,
      });

      setGoals((prev) => {
        const before = prev.filter(
          (prevGoal) => prevGoal.endDate < data.endDate,
        );
        const after = prev.filter(
          (prevGoal) => prevGoal.endDate >= data.endDate,
        );
        return [...before, data, ...after];
      });
      setModalOpen(false);
    },
    onError: ({ response }: any) => {
      window.alert(response.data.error.message);
    },
  });

  // update Goal mutation
  const { mutate: editGoalMutate } = useMutation({
    mutationKey: ["updateMyGoal"],
    mutationFn: updateMyGoal,
    onSuccess: (data) => {
      setGoals((prev) => {
        const editGoals = prev.map((prevGoal) => {
          if (prevGoal.id === data.id) {
            return data;
          }
          return prevGoal;
        });
        // Use sort instead of filter to order the goals by endDate
        return editGoals.sort(
          (a, b) =>
            new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
        );
      });
      setModalOpen(false);
    },
    onError: ({ response }: any) => {
      window.alert(response.data.error.message);
    },
  });

  const { mutate: deleteGoalMutate } = useMutation({
    mutationKey: ["deleteMyGoal"],
    mutationFn: deleteMyGoal,
    onSuccess: (data) => {
      setModalOpen(false);

      setGoals((prev) =>
        prev.filter((prevGoal) => prevGoal.id !== data.goalId),
      );
    },
    onError: ({ response }: any) => {
      window.alert(response.data.error.message);
    },
  });

  // create & edit submit
  const onSubmit = (data: any) => {
    if (type !== "edit") {
      if (goals.length > 5) {
        return window.alert("You can have only 5 objectives");
      } else {
        data = {
          ...data,
          startDate: dayjs(data.startDate).format("YYYY-MM-DD"),
          endDate: dayjs(data.endDate).format("YYYY-MM-DD"),
        };
        createGoalMutate(data);
      }
    } else if (type === "edit") {
      data = {
        ...data,
        startDate: dayjs(data.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(data.endDate).format("YYYY-MM-DD"),
      };
      editGoalMutate({ updateData: data, goalId: goal.id });
    }
  };

  // delete Goal
  const handleDeleteGoal = () => {
    deleteGoalMutate({ deleteId: goal.id });
  };

  return (
    <Modal
      className="flex items-center justify-center"
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <div className="flex h-[650px] w-[300px] flex-col gap-10 rounded-2xl bg-default-200 p-6 xxs:w-[360px] xs:w-[500px]">
        <div className="flex w-full items-center justify-between">
          <span className="flex-auto text-center text-xl font-semibold">
            {type === "create" ? "Create Goal" : "Edit Goal"}
          </span>
          <button
            onClick={() => setModalOpen(false)}
            className="rounded-full p-2 hover:bg-default-300"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col gap-8"
        >
          <div className="flex flex-auto flex-col gap-1">
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <input
              id="title"
              {...createGoalRegister("title", { required: true })}
              className="w-full rounded-lg border-2 border-default-400 bg-default-100 p-2 outline-none hover:border-default-600 focus:border-default-900"
              placeholder="Please wrtie your goal..."
            />
          </div>
          <div className="flex items-end gap-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex flex-col gap-1">
                <label htmlFor="startDate" className="font-semibold">
                  Start Date
                </label>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      minDate={dayjs(date).subtract(6, "month")}
                      maxDate={dayjs(date).add(6, "month")}
                      sx={{
                        ".MuiInputBase-root": {
                          backgroundColor: "#FBFAF2",
                          borderRadius: "8px",
                          "&:hover": {
                            borderColor: "#857762",
                          },
                          "& .Muifocused": {
                            borderColor: "#857762",
                          },

                          "& .MuiInputBase-input": {
                            padding: "10px 10px",
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>
              <span className="pb-2">to</span>
              <div className="flex flex-col gap-1">
                <label htmlFor="endDate" className="font-semibold">
                  End Date
                </label>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      minDate={dayjs(startDate)}
                      maxDate={dayjs(date).add(1, "year")}
                      sx={{
                        ".MuiInputBase-root": {
                          backgroundColor: "#FBFAF2",
                          borderRadius: "8px",
                          "&:hover": {
                            borderColor: "#857762",
                          },
                          "& .Muifocused": {
                            borderColor: "#857762",
                          },
                          "& .MuiInputBase-input": {
                            padding: "10px 10px",
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>
            </LocalizationProvider>
          </div>
          <div className="flex h-full w-full flex-col gap-1">
            <div className="flex justify-between">
              <label htmlFor="content" className="font-semibold">
                Content
              </label>
              <div className="flex gap-2">
                <span className="font-semibold">Today:</span>
                <span>{date}</span>
              </div>
            </div>
            <textarea
              id="content"
              {...createGoalRegister("body", { required: true })}
              className="h-2/3 w-full resize-none rounded-lg border-2 border-default-400 bg-default-100 p-2 outline-none hover:border-default-600 focus:border-default-900"
              placeholder="Please write the content..."
            />
          </div>

          <div className="flex items-end justify-between">
            <div className="flex items-center gap-2">
              <label htmlFor="isPublic" className="font-semibold">
                PUBLIC
              </label>
              <Controller
                name="isPublic"
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    checked={field.value}
                    onChange={field.onChange}
                    sx={{
                      /// switch 기본 박스 크기
                      padding: 0,
                      width: "32px",
                      height: "20px",
                      "& .MuiSwitch-switchBase": {
                        padding: 0,
                        margin: "2px",
                        transitionDuration: "300ms",
                        /// 체크될때
                        "&.Mui-checked": {
                          transform: "translateX(12px)",
                          color: "#fff",
                          "& + .MuiSwitch-track": {
                            backgroundColor: "#143422",
                            opacity: 1,
                            border: 0,
                          },
                          "&.Mui-disabled + .MuiSwitch-track": {
                            opacity: 0.5,
                          },
                        },
                      },
                      "& .MuiSwitch-thumb": {
                        boxSizing: "border-box",
                        width: 16,
                        height: 16,
                      },
                      "& .MuiSwitch-track": {
                        borderRadius: 26 / 2,
                        backgroundColor: "#b6b6c0",
                        opacity: 1,
                      },
                    }}
                  />
                )}
              />
            </div>
            <div className="flex gap-2">
              {type === "edit" && (
                <button
                  type="button"
                  onClick={() => handleDeleteGoal()}
                  className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-2"
                >
                  <XIcon className="h-4 w-4" color="white" />
                  <span className="font-semibold text-white">Delete</span>
                </button>
              )}
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg border-2 border-black px-3 py-2 font-semibold hover:bg-default-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-default-800 px-3 py-2 font-semibold text-white hover:bg-default-900"
              >
                {type !== "edit" ? "Create Goal" : "Edit Goal"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
