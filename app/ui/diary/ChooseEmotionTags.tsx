import { useState } from "react";

import Tags from "@/public/diary/Tags";

export default function ChooseEmotionTags({
  onTagSelect,
}: {
  onTagSelect: (tags: string[]) => void;
}) {
  const [selectedTags, setSelectedTags] = useState([] as string[]);

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
    setSelectedTags((prevTags) => {
      // 이미 선택된 태그라면 제거, 아니라면 추가
      const newTags = prevTags.includes(tag)
        ? prevTags.filter((prevTag) => prevTag !== tag)
        : [...prevTags, tag];
      onTagSelect(newTags);
      return newTags;
    });
  };

  return (
    <span className="mb-8 mt-2 flex flex-wrap gap-2 px-6">
      {tags.map((tag) => (
        <Tags
          key={tag}
          text={tag}
          selected={selectedTags.includes(tag)}
          onClick={() => handleTagClick(tag)}
        />
      ))}
    </span>
  );
}
