import DiaryCard from "./DiaryCard";
export default function MoodArray({ mood, remembers }: any) {
  const diariesForMood = remembers.filter(
    (remember: any) => remember.mood === mood,
  );
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-semibold text-white">
        {mood.toUpperCase() + " __"}
      </h2>
      <div className="flex gap-5 overflow-x-scroll scrollbar-hide">
        {diariesForMood.map((remember: any) => (
          <DiaryCard key={remember.id} remember={remember} />
        ))}
      </div>
    </div>
  );
}
