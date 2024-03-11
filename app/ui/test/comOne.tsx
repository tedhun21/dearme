import { getToday } from "@/util/date";
import axios from "axios";
import { cookies } from "next/headers";

export default async function Component1() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("access_token");

  if (!cookie) {
    return null;
  }

  const { value: access_token } = cookie || {};

  const { data } = await axios.get(
    `http://localhost:1337/api/todos?date=${getToday()}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    },
  );

  return (
    <div>
      <span>Server Side</span>
      {data.length === 0 && <div>No Data</div>}
      {data.map((data: any) => (
        <div key={data.id}>{data.body}</div>
      ))}
    </div>
  );
}
