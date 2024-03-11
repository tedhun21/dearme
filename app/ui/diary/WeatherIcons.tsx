import Image from "next/image";

import ClearWeather from "@/public/diary/ClearWeather";
import CloudsWeather from "@/public/diary/CloudsWeather";
import RainWeather from "@/public/diary/RainWeather";
import DrizzleWeather from "@/public/diary/DrizzleWeather";
import SnowWeather from "@/public/diary/SnowWeather";
import ThunderstormWeather from "@/public/diary/ThunderstormWeather";
import FogWeather from "@/public/diary/FogWeather";

{
  /* 사용
   <WeatherIcons
  weatherId={diary.weatherId}
  className="h-4 w-4 fill-current text-white"
/>; */
}

export default function WeatherIcons({
  weatherId,
  className,
}: {
  weatherId: any;
  className?: string;
}) {
  // 날씨 ID 범위에 따른 아이콘 반환 함수
  const getWeatherIcon = (weatherId: any) => {
    if (weatherId >= 200 && weatherId < 300) {
      return <ThunderstormWeather className={className} />;
    } else if (weatherId >= 300 && weatherId < 400) {
      return <DrizzleWeather className={className} />;
    } else if (weatherId >= 500 && weatherId < 600) {
      return <RainWeather className={className} />;
    } else if (weatherId >= 600 && weatherId < 700) {
      return <SnowWeather className={className} />;
    } else if (weatherId >= 700 && weatherId < 800) {
      return <FogWeather className={className} />;
    } else if (weatherId === 800) {
      return <ClearWeather />;
    } else if (weatherId > 800 && weatherId <= 804) {
      return <CloudsWeather className={className} />;
    } else {
      // 대체 아이콘 또는 기본값
      return <CloudsWeather className={className} />;
    }
  };

  const Icon = getWeatherIcon(weatherId) || CloudsWeather;

  return <div>{Icon || <div>Weather icon not available</div>}</div>;
}
