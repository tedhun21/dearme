import BackButton from "@/app/ui/backbutton";
import Header from "@/app/ui/header";
import MeNav from "@/app/ui/me/MeNav";
import Image from "next/image";

export default function MePost() {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className="flex items-center px-6">
          <BackButton />
        </div>
        <MeNav />
        <article>
          <h1 className="mx-5 mb-3 text-base font-semibold">포스트</h1>
          <section>
            <div className="grid grid-cols-3 xxs:grid-cols-4 xs:grid-cols-5">
              <div className="flex items-center justify-center">
                <Image
                  src="/me/chu.png"
                  width={500}
                  height={500}
                  alt="user"
                  // sizes="(max-width:400px) 33vw (max-width:500px) 25vw (max-width:600px) 20vw"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/me/petmily.png"
                  width={500}
                  height={500}
                  alt="petmily"
                />
              </div>
              <div className="bg-default-800 text-center">03</div>
              <div className="bg-default-800 text-center">04</div>
              <div className="bg-default-800 text-center">05</div>
              <div className="bg-default-800 text-center">06</div>
              <div className="bg-default-800 text-center">07</div>
              <div className="bg-default-800 text-center">08</div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
