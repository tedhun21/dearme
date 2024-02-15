"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { CircularProgress } from "@mui/material"; // 로딩 중 표시

export default function GoogleRedirect() {
  const router = useRouter();

  useEffect(() => {
    // URL에서 쿼리 파라미터를 추출. (`id_token`과 `access_token`이 존재한다면, Google 로그인이 성공적으로 완료된 것)
    const urlParams = new URLSearchParams(window.location.search);
    const idToken = urlParams.get("id_token");
    const accessToken = urlParams.get("access_token");

    const handleGoogleLogin = async (tokens: any) => {
      try {
        // Google 로그인이 성공적으로 완료된 후 `id_token`과 `access_token`을 백엔드로 전송하여 사용자의 Google 계정 정보를 가져옵니다.
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`,
          {
            params: {
              id_token: tokens.id_token,
              access_token: tokens.access_token,
            },
          },
        );
        localStorage.removeItem("token");
        window.location.replace("/"); // replace는 뒤로가기를 눌렀을 때, 이전 페이지로 돌아가지 않는다.
      } catch (error) {
        console.error("Google 계정 정보를 가져오는 데 실패했습니다", error);
      }
    };

    // idToken과 accessToken이 있다면, 백엔드에 검증을 요청.
    if (idToken && accessToken) {
      handleGoogleLogin({ id_token: idToken, access_token: accessToken });
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <CircularProgress size={64} />
    </div>
  );
}
