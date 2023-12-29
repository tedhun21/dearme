import Tags from "@/public/diary/Tags";

export default function ChooseEmotionTags() {
  const tags = [
    "#상쾌한",
    "#피곤한",
    "#행복한",
    "#의욕적인",
    "#짜증나는",
    "#외로운",
    "#신나는",
    "#뿌듯한",
    "#불안한",
    "#우울한",
    "#설레는",
    "#편안한",
    "#화남",
    "#슬픈",
    "#기대되는",
    "#부담되는",
  ];

  // 각 태그를 클릭했을 때의 핸들러
  const handleTagClick = (tag: string) => {
    console.log("Clicked on tag:", tag);
    // 여기서 태그 클릭에 대한 로직을 추가할 수 있습니다.
  };

  return (
    <span className="mb-8 mt-2 flex flex-wrap gap-2 px-6">
      {tags.map((tag) => (
        <Tags key={tag} text={tag} onClick={() => handleTagClick(tag)} />
      ))}
    </span>
  );
}
