import BackButton from "@/app/ui/backbutton";
import FollowList from "@/app/ui/me/FollowList";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";

export default function Friends() {
  return (
    <section className="mb-20 px-4 py-3">
      <div className="flex flex-col items-start gap-3">
        <BackButton />
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#FBFAF2",
            borderRadius: "12px",
            borderColor: "#EBE3D5",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Your Friend"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <Divider sx={{ my: "20px" }} />

      <FollowList />
      <FollowList />
      <FollowList />
      <FollowList />
      <FollowList />
      <FollowList />
      <FollowList />
      <FollowList />
      <FollowList />
      <FollowList />
      <FollowList />
      <FollowList />
    </section>
  );
}