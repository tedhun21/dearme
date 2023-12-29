import Companions from "@/public/diary/Companions";

export default function ChooseCompanions() {
  const companions = ["가족", "연인", "친구", "지인", "안만남"];

  // 각 태그를 클릭했을 때의 핸들러
  const handleTagClick = (tag: string) => {
    console.log("Clicked on tag:", tag);
    // 여기서 태그 클릭에 대한 로직을 추가할 수 있습니다.
  };

  return (
    <span className="mb-8 mt-2 flex flex-wrap gap-2 px-6">
      {companions.map((tag) => (
        <Companions key={tag} text={tag} onClick={() => handleTagClick(tag)} />
      ))}
    </span>
  );
}
