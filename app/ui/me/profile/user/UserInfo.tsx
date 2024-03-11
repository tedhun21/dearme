"use client";

import { useParams } from "next/navigation";

import UserProfile from "./UserProfile";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/store/api";
import UserPlan from "./UserPlan";

export default function UserInfo({ me }: any) {
  // middleware 사용해서 server component로 만들기
  const { id: profileId }: { id: string } = useParams();

  const { data: userData } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser({ userId: profileId }),
  });

  return (
    <>
      <UserProfile user={userData} me={me} />
      <UserPlan user={userData} />
    </>
  );
}
