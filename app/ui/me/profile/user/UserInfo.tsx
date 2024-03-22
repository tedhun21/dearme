"use client";

import { useParams } from "next/navigation";

import UserProfile from "./UserProfile";
import { useQuery } from "@tanstack/react-query";
import { findFriendship, getUser } from "@/store/api";
import UserPlan from "./UserPlan";

export default function UserInfo({ me }: any) {
  // middleware 사용해서 server component로 만들기
  const { id: profileId }: { id: string } = useParams();

  const { data: userData } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser({ userId: profileId }),
    enabled: !!profileId,
  });

  // 유저와 나와의 관계
  const { data: friendshipData } = useQuery({
    queryKey: ["getFriendship"],
    queryFn: () => findFriendship(userData.id),
    enabled: !!userData && !!me,
  });

  return (
    <>
      <UserProfile user={userData} me={me} friendshipData={friendshipData} />
      <UserPlan user={userData} me={me} friendshipData={friendshipData} />
    </>
  );
}
