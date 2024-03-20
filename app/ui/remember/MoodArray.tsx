import DiaryCard from "./DiaryCard";
export default function MoodArray({ mood, remembers }: any) {
  const diariesForMood = remembers.filter(
    (remember: any) => remember.mood === mood,
  );
  return (
    <>
      <h2 className="mb-4 text-base font-semibold text-white">
        {mood.charAt(0).toUpperCase() + mood.slice(1)} __
      </h2>
      <div className="flex gap-5 overflow-x-scroll scrollbar-hide">
        {diariesForMood.map((remember: any) => (
          <DiaryCard key={remember.id} remember={remember} />
        ))}
      </div>
    </>
  );
}
