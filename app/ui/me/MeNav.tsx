"use client";

import MeNavList from "./MeNavList";

const navList = [
  { id: 1, name: "Plans", href: "/me" },
  { id: 2, name: "Posts", href: "/me/posts" },
  { id: 3, name: "Followers", href: "/me/followers" },
  { id: 4, name: "Remembers", href: "/diary/remembers" },
];

export default function MeNav() {
  return (
    <section className="flex justify-between bg-default-300">
      {navList.map((nav) => (
        <MeNavList key={nav.id} nav={nav} />
      ))}
    </section>
  );
}
