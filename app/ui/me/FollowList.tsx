export default function FollowList({ request }: { request?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-default-300">
      <div className="flex items-center gap-6">
        <div className="h-14 w-14 rounded-full bg-default-500" />
        <span className="font-semibold">ryan</span>
      </div>
      {request ? (
        <div className="flex gap-2">
          <button className="rounded-lg bg-default-500 px-4 py-1 font-medium text-white hover:bg-default-600 active:bg-default-700">
            Confirm
          </button>
          <button className="rounded-lg bg-default-500 px-4 py-1 font-medium text-white hover:bg-default-600 active:bg-default-700">
            Delete
          </button>
        </div>
      ) : (
        <button className="rounded-lg bg-default-500 px-4 py-1 font-medium text-white hover:bg-default-600 active:bg-default-700">
          Block
        </button>
      )}
    </div>
  );
}
