import { useState, useEffect } from "react";
import Image from "next/image";

export default function SentimentalQuotes() {
  const [imageSrc, setImageSrc] = useState("");

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
    <>
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
    </>
  );
}
