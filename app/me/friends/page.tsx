import BackButton from "@/app/ui/backbutton";
import Header from "@/app/ui/header";
import PlusFriendIcon from "@/public/me/PlusFriendIcon";
import SearchIcon from "@/public/me/SearchIcon";
import UserIcon from "@/public/me/UserIcon";

export default function MeFriend() {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className="flex items-center px-6">
          <BackButton />
        </div>
        <div className="flex items-center gap-4 px-5 py-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-default-500">
            <UserIcon />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">doe</span>
            <div className="flex gap-5">
              <div className="text-xs font-semibold text-default-500">
                12 Posts
              </div>
              <div className="text-xs font-semibold text-default-500">
                4 Friends
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-5 px-6 py-3">
          <input className="w-full rounded-lg border-2 border-default-400 px-3 text-base font-semibold" />
          <button>
            <SearchIcon className="h-5 w-5 fill-current text-default-400 hover:text-default-500 active:text-default-700" />
          </button>
        </div>
        <article className="flex flex-col gap-3 px-5 py-3">
          <section>
            <h1 className="text-base font-semibold">친구 요청 1</h1>
            <div className="flex flex-col gap-1 py-2">
              <div className="group flex items-center justify-between rounded-lg p-2 hover:bg-default-300">
                <div className="flex items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-default-500">
                    <UserIcon />
                  </div>
                  <div className="text-base font-semibold">ryan</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-default-500 px-4 py-1 text-xs font-semibold text-white hover:bg-default-700 active:bg-default-800">
                    수락
                  </button>
                  <button className="rounded-lg bg-default-500 px-4 py-1 text-xs font-semibold text-white hover:bg-default-700 active:bg-default-800">
                    삭제
                  </button>
                </div>
              </div>
              <div className="group flex items-center justify-between rounded-lg p-2 hover:bg-default-300">
                <div className="flex items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-default-500">
                    <UserIcon />
                  </div>
                  <div className="text-base font-semibold">ryan</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-default-500 px-4 py-1 text-xs font-semibold text-white hover:bg-default-700 active:bg-default-800">
                    수락
                  </button>
                  <button className="rounded-lg bg-default-500 px-4 py-1 text-xs font-semibold text-white hover:bg-default-700 active:bg-default-800">
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="flex justify-between">
              <h1 className="text-base font-semibold">친구 4</h1>
              <button>
                <PlusFriendIcon className="h-5 w-5 fill-current text-default-700 hover:text-default-800" />
              </button>
            </div>
            <div className="flex flex-col gap-1 py-2 ">
              <div className="group flex items-center justify-between rounded-lg p-2 hover:bg-default-300">
                <div className="flex items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-default-500">
                    <UserIcon />
                  </div>
                  <div className="text-base font-semibold">ryan</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-default-500 px-4 py-1 text-xs font-semibold text-white hover:bg-default-700 active:bg-default-800">
                    차단
                  </button>
                </div>
              </div>
              <div className="group flex items-center justify-between rounded-lg p-2 hover:bg-default-300">
                <div className="flex items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-default-500">
                    <UserIcon />
                  </div>
                  <div className="text-base font-semibold">ryan</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-default-500 px-4 py-1 text-xs font-semibold text-white hover:bg-default-700 active:bg-default-800">
                    차단
                  </button>
                </div>
              </div>
              <div className="group flex items-center justify-between rounded-lg p-2 hover:bg-default-300">
                <div className="flex items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-default-500">
                    <UserIcon />
                  </div>
                  <div className="text-base font-semibold">ryan</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-default-500 px-4 py-1 text-xs font-semibold text-white hover:bg-default-700 active:bg-default-800">
                    차단
                  </button>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
