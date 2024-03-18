/* eslint-disable @next/next/no-img-element */

import TodayPick from "./TodayPick";

export default function TodayPicks({ picks }: any) {
  return (
    <div>
      <article className="mb-3 rounded bg-default-800">
        <section className="p-5">
          <h1 className="mb-3 text-lg font-semibold text-white">
            Today&#39;s PICK
          </h1>
          {picks.length > 0 && (
            <div className="flex overflow-x-scroll whitespace-nowrap scrollbar-hide">
              {picks.map((pick: any) => (
                <TodayPick key={pick.id} pick={pick} />
              ))}
            </div>
          )}
        </section>
      </article>
    </div>
  );
}
