import DownDropdownIcon from "@/public/me/DownDropdownIcon";
import { LinearProgress } from "@mui/material";

export default function TodoRate() {
  return (
    <section className="flex items-center justify-between pb-2">
      <div className="flex items-center gap-2">
        <DownDropdownIcon className="h-4 w-4 fill-current text-default-500 hover:text-default-700" />
        <h1 className="text-base font-semibold text-default-700">Daily</h1>
      </div>

      <LinearProgress
        sx={{
          height: "12px",
          borderRadius: "12px",
          width: "100%",
          color: "#143422",
          mx: 2,
        }}
        variant="determinate"
        value={(3 / 5) * 100}
        color="inherit"
      />

      <span className="mx-1 whitespace-nowrap text-xs font-semibold text-default-600">
        3 / 5
      </span>
    </section>
  );
}
