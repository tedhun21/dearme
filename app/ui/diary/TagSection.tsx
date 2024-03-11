import { useState } from "react";

import TagIcon from "@/public/diary/TagIcon";

export default function TagSection({
  feelingsTags,
}: {
  feelingsTags: string[];
}) {
  const [showAllTags, setShowAllTags] = useState(false);

  const handleShowMoreTags = () => {
    setShowAllTags(true);
  };

  return (
    <section className="flex items-center gap-4">
      <span className="flex-shrink-0">
        <TagIcon />
      </span>
      <div className="flex flex-wrap gap-y-3">
        {/* 첫 3개의 태그 또는 모든 태그를 렌더링 */}
        {feelingsTags
          .slice(0, showAllTags ? feelingsTags.length : 3)
          .map((tag, index) => (
            <div
              key={index}
              className="mr-3 inline-block rounded-full border-2 border-default-400 bg-default-300 px-3 py-0.5 text-base font-semibold text-default-800"
            >
              {tag}
            </div>
          ))}
        {/* 태그가 3개 이상일 때만 더 보기 버튼을 줌 */}
        {!showAllTags && feelingsTags.length > 3 && (
          <button
            onClick={handleShowMoreTags}
            className="mr-3 inline-block rounded-full border-2 border-default-400 bg-default-300 px-2 py-0.5 text-base font-semibold text-default-800 hover:text-default-900"
          >
            + {feelingsTags.length - 3}
          </button>
        )}
      </div>
    </section>
  );
}
