import Image from "next/image";

export default function Login() {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex min-w-[360px] max-w-[600px] flex-col bg-default-200">
        <div className="pl-4 pt-4">
          <Image
            className="h-4 w-4 object-contain"
            src="/login/backIcon.svg"
            alt="BackIcon"
            width={4}
            height={4}
          />
        </div>
        <div className="flex justify-center pt-[84px]">
          <Image
            className="h-32 w-32 object-contain"
            src="/login/dearmeLogo.svg"
            alt="Logo"
            width={32}
            height={32}
          />
        </div>
        <div className="flex-col justify-center">
          <div className="mt-[-28px] flex justify-center">
            <div className="min-h-screen w-[220px] flex-col items-center justify-center">
              <label
                htmlFor="ID"
                className="font-small block text-sm leading-8 text-gray-500"
              >
                ID
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="input"
                  id="id input"
                  className="block w-full border-b-2 border-black bg-transparent py-1.5 pl-8 pr-8 text-default-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-[-580px] flex justify-center">
            <div className="min-h-screen w-[220px] flex-col items-center justify-center">
              <label
                htmlFor="Password"
                className="font-small block text-sm leading-8 text-gray-500"
              >
                PW
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="password"
                  name="input"
                  id="password input"
                  className="block w-full border-b-2 border-black bg-transparent py-1.5 pl-8 pr-8 text-default-500 sm:text-sm sm:leading-6"
                />
              </div>
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                className="mt-4"
              />
            </div>
          </div>
          {/* <div className="mt-[-884px] flex min-h-screen w-[220px] items-center justify-center text-default-500 ring-2">
            log in
          </div> */}
        </div>
      </div>
    </main>
  );
}
