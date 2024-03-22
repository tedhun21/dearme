export default function AutoComplete({
  searchKeyword,
}: {
  searchKeyword: string;
  friends: any;
}) {
  // 한글인지 영어인지를 판별하는 함수
  //   const isHangul = (char: string) => {
  //     const charCode = char.charCodeAt(0);
  //     return (
  //       (charCode >= 0x1100 && charCode <= 0x11ff) || // 한글 자모음 영역
  //       (charCode >= 0xac00 && charCode <= 0xd7af)
  //     ); // 한글 음절 영역
  //   };

  //   // 검색어가 한글인지 영어인지를 판별
  //   const isKorean = searchKeyword.split("").some(isHangul);
  //   const regexKeyword = isKorean
  //     ? searchKeyword
  //         .split("")
  //         .map((char) => (isHangul(char) ? `[${char}]` : char))
  //         .join("")
  //     : searchKeyword;

  //   // 검색어를 이용하여 친구 목록을 필터링
  //   const filteredFriends = friends.filter((friend: any) => {
  //     const friendNickname = friend.nickname.toLowerCase();
  //     return friendNickname.includes(regexKeyword.toLowerCase());
  //   });

  const friends = [
    { nickname: "굽네치킨" },
    { nickname: "지코바 치킨" },
    { nickname: "버거킹" },
    { nickname: "bhc" },
    { nickname: "pizza hut" },
    { nickname: "햄버거" },
    { nickname: "햄토스트" },
    { nickname: "햄토스트" },
    { nickname: "햄토스트" },
    { nickname: "햄토스트" },
    { nickname: "햄토스트" },
    { nickname: "햄토스트" },
    { nickname: "햄토스트" },
    { nickname: "햄토스트" },
    { nickname: "햄토스트" },
    { nickname: "햄토스트" },
    { nickname: "햄토스트" },
  ];

  const filteredFriends = friends.filter((friend: any) =>
    friend.nickname.includes(
      searchKeyword.toLocaleLowerCase() || searchKeyword.toUpperCase(),
    ),
  );

  return (
    <div className="absolute z-10 w-full rounded-xl bg-white px-2 py-2">
      <div className="flex h-80 flex-col gap-2 overflow-y-auto">
        {filteredFriends.map((friend, index) => (
          <div key={index} className="p-1 hover:bg-default-200">
            {friend.nickname}
          </div>
        ))}
      </div>
    </div>
  );
}
