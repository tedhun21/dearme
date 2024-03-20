import { useState, useEffect } from "react";
import Image from "next/image";
import CreateDiaryButton from "./CreateDiaryButton";
import { useParams } from "next/navigation";
import CirclePlus from "@/public/diary/CirclePlus";

export default function SentimentalQuotes() {
  const [imageSrc, setImageSrc] = useState("");
  const params = useParams();

  const handleClick = () => {
    if (params.date) {
      // 이동할 URL 생성
      const newPath = `/${params.date}/diary/create`;
      // 페이지 이동
      window.location.href = newPath;
    }
  };

  useEffect(() => {
    // 사용할 이미지 목록
    const images = [
      "/diary/SentimentalPhoto.svg",
      "/diary/SentimentalPhoto1.svg",
      "/diary/SentimentalPhoto2.svg",
      "/diary/SentimentalPhoto3.svg",
      "/diary/SentimentalPhoto4.svg",
      // 추가 이미지 경로...
    ];

    // 랜덤 인덱스 생성
    const randomIndex = Math.floor(Math.random() * images.length);

    // 이미지 경로 설정
    setImageSrc(images[randomIndex]);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

  return (
    <div>
      {imageSrc && (
        <Image
          src={imageSrc}
          width={600}
          height={200}
          alt="SentimentalQuotes"
          quality={80}
          priority
        />
      )}
    </div>
  );
}
