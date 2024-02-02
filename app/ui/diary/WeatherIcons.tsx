import Image from "next/image";

import ClearWeather from "../../../public/diary/ClearWeather.svg";
import CloudsWeather from "../../../public/diary/CloudsWeather.svg";
import RainWeather from "../../../public/diary/RainWeather.svg";
import DrizzleWeather from "../../../public/diary/DrizzleWeather.svg";
import SnowWeather from "../../../public/diary/SnowWeather.svg";
import ThunderstormWeather from "../../../public/diary/ThunderstormWeather.svg";
import FogWeather from "../../../public/diary/FogWeather.svg";

export default function WeatherIcons({ weatherId }) {
  // 날씨 ID 범위에 따른 아이콘 반환 함수
  const getWeatherIcon = (weatherId: any) => {
    if (weatherId >= 200 && weatherId < 300) {
      return ThunderstormWeather;
    } else if (weatherId >= 300 && weatherId < 400) {
      return DrizzleWeather;
    } else if (weatherId >= 500 && weatherId < 600) {
      return RainWeather;
    } else if (weatherId >= 600 && weatherId < 700) {
      return SnowWeather;
    } else if (weatherId >= 700 && weatherId < 800) {
      return FogWeather;
    } else if (weatherId === 800) {
      return ClearWeather;
    } else if (weatherId > 800 && weatherId <= 804) {
      return CloudsWeather;
    } else {
      // 대체 아이콘 또는 기본값
      return CloudsWeather;
    }
  };

  const Icon = getWeatherIcon(weatherId) || CloudsWeather;

  return (
    <div>
      {Icon ? (
        <Image src={Icon} alt="Weather Icon" />
      ) : (
        <div>Weather icon not available</div>
      )}
    </div>
  );
}
