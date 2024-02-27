import { filter } from "@/store/atoms";
import { useSetRecoilState } from "recoil";

export default function Component1() {
  const setFilter = useSetRecoilState(filter);
  return <button onClick={() => setFilter("done")}>1</button>;
}
