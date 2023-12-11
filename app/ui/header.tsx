import Image from "next/image";

export default function Header() {
  return (
    <header className="flex w-full flex-row justify-between p-5">
      <Image
        src="/header/logo.png"
        width={77}
        height={20}
        alt="logo"
        quality={80}
      />
      <div className="flex flex-row gap-2 p-1">
        <Image
          src="/header/notification.svg"
          width={14}
          height={12}
          alt="notification"
          quality={80}
        />
        <Image
          src="/header/settings.svg"
          width={14}
          height={14}
          alt="settings"
        />
      </div>
    </header>
  );
}
