export default function MeGoal() {
  return (
    <section>
      <div className="font-semibold text-default-700">목표</div>
      <div className="flex flex-col gap-3 rounded-xl bg-default-100 px-4 py-3">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-2xs font-bold text-red-600 dark:bg-red-300">
              New
            </span>
            <div className="font-bold">
              &quot;새로운 시작, 일기 앱 개발의 완료&quot;
            </div>
            <div className="text-2xs">목표 날짜: 12월 25일, 2023 (월)</div>
          </div>
          <div className="flex items-center justify-center">
            <span className="rounded-lg border-2 border-default-700 px-2 font-semibold">
              -21
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="font-bold">&quot;취업하자&quot;</div>
            <div className="text-2xs">목표 날짜: 1월 1일, 2024 (월)</div>
          </div>
          <div className="flex items-center justify-center">
            <span className="rounded-lg border-2 border-default-700 px-2 font-semibold">
              -28
            </span>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
}
