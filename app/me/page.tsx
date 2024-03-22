import Link from "next/link";

import { getToday } from "@/util/date";

import MeTodo from "../ui/me/MeTodo";
import MeGoal from "../ui/me/plans/MeGoal";

export default async function Me() {
  return (
    <section className="mb-20 mt-4 flex flex-col">
      <MeTodo />
      <MeGoal route="/me" />
      <div className="flex justify-center p-5">
        <Link
          href={`/${getToday()}/todogoal`}
          className="rounded-xl bg-default-800 px-4 py-2 font-semibold text-white hover:bg-default-900"
        >
          Click to manage Todo & Goal
        </Link>
      </div>
    </section>
  );
}
