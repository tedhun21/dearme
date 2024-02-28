import { useEffect, useState } from "react";

import Tags from "@/public/diary/Tags";

export default function ChooseEmotionTags({
  onTagSelect,
  updatedEmotionTags,
}: {
  onTagSelect: (tags: string) => void;
  updatedEmotionTags: string;
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

  useEffect(() => {
    if (
      typeof updatedEmotionTags === "string" &&
      updatedEmotionTags.trim().length > 0
    ) {
      setSelectedTags(updatedEmotionTags.split(" "));
    } else {
      setSelectedTags([]);
    }
  }, [updatedEmotionTags]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) => {
      const isTagSelected = prevTags.includes(tag);
      let newTags;

      if (isTagSelected) {
        newTags = prevTags.filter((prevTag) => prevTag !== tag);
      } else {
        newTags = [...prevTags, tag];
      }

      onTagSelect(newTags.join(" "));
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
