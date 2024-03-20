import { Controller, useForm } from "react-hook-form";

import dayjs from "dayjs";
import { Modal } from "@mui/joy";
import { Switch } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import XIcon from "@/public/todo/XIcon";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMyGoal } from "@/store/api";

export default function NewGoalModal({
  date,
  modalOpen,
  setModalOpen,
  setOpenCreatePost,
  goals,
}: any) {
  // const [goals, setGoals] = useRecoilState(goalListState);

  const queryClient = useQueryClient();

  const {
    register: createGoalRegister,
    watch,
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
      startDate: dayjs(date),
      endDate: dayjs(date),
      isPublic: true,
    },
  });

  const {
    isSuccess: isCreateSuccess,
    mutate: createGoalMutate,
    data: goalData,
  } = useMutation({
    mutationKey: ["createMyGoal"],
    mutationFn: createMyGoal,
    onSuccess: (data) => {
      // create goal 모달 닫기
      setModalOpen(false);
      // 닫혀있던 create post모달 열기
      setOpenCreatePost(true);
      // goal 통신 다시 하기
      queryClient.invalidateQueries({ queryKey: ["getGoals"] });
    },
  });

  const onSubmit = (data: any) => {
    if (goals.length > 5) {
      window.alert("You can have only 5 objectives");
    } else {
      data = {
        ...data,
        startDate: dayjs(data.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(data.endDate).format("YYYY-MM-DD"),
      };
      createGoalMutate(data);
    }
  };

  // console.log(watch());

  return (
    <Modal
      className="flex items-center justify-center"
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <div className="flex h-1/2 w-[300px] flex-col items-center rounded-2xl bg-default-200 p-6 xxs:w-[360px] xs:w-[500px]">
        <div className="flex w-full items-center justify-between">
          <span className="flex-auto text-center text-xl font-semibold">
            Create Goal
          </span>
          <button
            onClick={() => setModalOpen(false)}
            className="rounded-full p-2 hover:bg-default-400"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col gap-3"
        >
          <div className="flex-auto">
            <label htmlFor="title" className="text-sm font-bold">
              Title
            </label>
            <input
              {...createGoalRegister("title", { required: true })}
              className="w-full rounded-lg border-2 border-default-400 bg-default-100 p-1 outline-none hover:border-default-600 focus:border-default-900"
              placeholder="Please wrtie your goal..."
            />
          </div>
          <div className="flex gap-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex items-center gap-4">
                <label htmlFor="startDate" className="text-sm font-semibold">
                  Start
                </label>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      onChange={(newValue) => field.onChange(newValue)}
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
              <div className="flex items-center">
                <label htmlFor="endDate" className="text-sm font-semibold">
                  End
                </label>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
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
          <div className="h-full w-full">
            <div>{date}</div>
            <textarea
              {...createGoalRegister("body", { required: true })}
              className="h-1/2 w-full rounded-lg border-2 border-default-400 bg-default-100 p-2 outline-none focus:border-default-900"
              placeholder="please write the content..."
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>PUBLIC</div>

              <Controller
                name="isPublic"
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    defaultChecked
                    onChange={(prev) => field.onChange(!prev)}
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
          </div>
          <button
            type="submit"
            className="rounded-lg bg-default-800 px-3 py-2 font-semibold text-white hover:bg-default-900"
          >
            Create Todo
          </button>
        </form>
      </div>
    </Modal>
  );
}
