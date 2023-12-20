import Link from "next/link";
import SocialIcon from "@/public/footer/SocialIcon";
import MindmapIcon from "@/public/footer/MindmapIcon";
import AnalysisIcon from "@/public/footer/AnalysisIcon";
import MypageIcon from "@/public/footer/MypageIcon";
import Home from "@/public/footer/Home";

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 flex justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] bg-default-100 shadow-lg">
        <div className="mx-8 flex w-full items-center justify-between gap-2">
          <Link // 소셜 버튼
            href="/social"
            className="flex flex-grow flex-col items-center text-gray-600 hover:text-gray-900"
          >
            <SocialIcon />
            <span className="mt-2 text-xs font-semibold">소셜</span>
          </Link>
          <Link // 마인드맵 버튼
            href="/mindmap"
            className="flex flex-grow flex-col items-center text-gray-600 hover:text-gray-900"
          >
            <MindmapIcon />
            <span className="mt-2 text-xs font-semibold">마인드맵</span>
          </Link>
          <div className="relative top-[-40px] rounded-full bg-default-200 p-1.5">
            <Link // 홈 버튼
              href="/"
              className="flex flex-col items-center text-gray-600 hover:text-gray-900"
            >
              <div className="rounded-full bg-default-300 p-6 shadow-lg hover:bg-default-400">
                <Home />
              </div>
            </Link>
          </div>
          <Link // 분석 버튼
            href="/analysis"
            className="flex flex-grow flex-col items-center text-gray-600 hover:text-gray-900"
          >
            <AnalysisIcon />
            <span className="mt-2 text-xs font-semibold">분석</span>
          </Link>
          <Link // 마이페이지 버튼
            href="/mypage"
            className="flex flex-grow flex-col items-center text-gray-600 hover:text-gray-900"
          >
            <MypageIcon />
            <span className="mt-2 text-xs font-semibold">마이페이지</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
