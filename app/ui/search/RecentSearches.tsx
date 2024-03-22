/* eslint-disable @next/next/no-img-element */
import CloseIcon from "@mui/icons-material/Close";
import GoalTag from "@/public/search/GoalTag";
import UserWithNoImage from "@/public/social/UserWithNoImage";

interface RecentSearchesProps {
  recentSearches: {
    id: number;
    text: string;
    photo?: string;
    userId?: number;
  }[];
  onRecentRemove: (id: number) => void;
  onClearRecent: () => void;
}

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

const RecentSearches: React.FC<RecentSearchesProps> = ({
  recentSearches,
  onRecentRemove,
  onClearRecent,
}) => {
  return (
    <section className="mt-5 flex w-full  flex-col  rounded-lg border-default-400 bg-default-100 px-5 pt-5">
      {/* Recent & Clear All */}
      <div className="mb-3 flex w-full justify-between">
        <span className="text-base font-medium">Recent</span>
        {recentSearches.length === 0 ? (
          <></>
        ) : (
          <button
            className="border-none text-sm font-medium text-default-400"
            onClick={onClearRecent}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Recents */}
      {recentSearches.length === 0 ? (
        <div className="mb-5 flex w-full justify-center text-base font-medium text-default-400">
          No recent searches
        </div>
      ) : (
        <div className="flex flex-col">
          {recentSearches.map((recent) => (
            <div
              key={recent.id}
              className="mb-5 flex items-center justify-between"
            >
              <a
                href={
                  recent.text.startsWith("#")
                    ? `/search/${recent.text.substring(1)}`
                    : `/profile/${recent.userId}`
                }
              >
                <div className="flex cursor-pointer items-center">
                  {recent.text.startsWith("#") ? (
                    <GoalTag className="h-12 w-12 rounded-full" />
                  ) : recent.photo ? (
                    <img
                      src={`${BUCKET_URL}${recent.photo}`}
                      alt="User Image"
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <UserWithNoImage className="l h-12 w-12" />
                  )}
                  <span className="ml-5 text-base font-semibold text-default-700">
                    {recent.text}
                  </span>
                </div>
              </a>
              <CloseIcon
                onClick={() => onRecentRemove(recent.id)}
                className="h-4 w-4 cursor-pointer text-default-700"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentSearches;
