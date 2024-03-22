import Tags from "@/public/diary/Tags";

export default function ChooseEmotionTags({
  selectedTags,
  setSelectedTags,
  onTagSelect,
}: any) {
  const tags = [
    "#FRESH",
    "#TIRED",
    "#HAPPY",
    "#MOTIVATED",
    "#ANNOYING",
    "#LONELY",
    "#EXCITING",
    "#PROUD",
    "#ANXIETY",
    "#DEPRESSED",
    "#PIT-A-PAT",
    "#COZY",
    "#ANGRY",
    "#GLOOMY",
    "#EXCITED",
    "#PRESSURE",
  ];

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags: any) => {
      const isTagSelected = prevTags?.includes(tag);
      let newTags;

      if (isTagSelected) {
        newTags = prevTags?.filter((prevTag: any) => prevTag !== tag);
      } else {
        newTags = [...prevTags, tag];
      }

      onTagSelect(newTags.join(" "));
      return newTags;
    });
  };

  return (
    <span className="flex flex-wrap gap-2 px-6 pb-4">
      {tags.map((tag) => (
        <Tags
          key={tag}
          text={tag}
          selected={selectedTags?.includes(tag)}
          onClick={() => handleTagClick(tag)}
        />
      ))}
    </span>
  );
}
