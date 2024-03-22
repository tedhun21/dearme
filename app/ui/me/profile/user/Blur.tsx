import { LinearProgress } from "@mui/material";

export default function Blur() {
  return (
    <div>
      <section className="flex items-center justify-between px-4 pb-2">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold text-default-700">Daily</h1>
        </div>

        <LinearProgress
          sx={{
            height: "16px",
            borderRadius: "12px",
            width: "100%",
            color: "#143422",
            mx: 2,
          }}
          variant="determinate"
          value={0}
          color="inherit"
        />

        <span className="mx-1 whitespace-nowrap text-xs font-semibold text-default-600">
          0 / 0
        </span>
      </section>
      <section className="px-4">
        <div className="font-semibold text-default-700">Goal</div>
        <div className="flex flex-col gap-3 rounded-xl bg-default-100 px-4 py-3">
          <div className="text-center font-bold">No Goal</div>
        </div>
      </section>
    </div>
  );
}
