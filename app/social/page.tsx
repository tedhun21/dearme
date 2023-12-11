import "../globals.css";
import React, { useState } from "react";
import SocialCard from "./SocialCard";

export default function Social() {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex min-w-[360px] max-w-[600px] flex-col bg-default-200">
        social
        <SocialCard />
      </div>
    </main>
  );
}
