"use client";

import React, { useState, useEffect } from "react";

// Tab 컴포넌트
interface TabsProps {
  selectedTab: string;
  onTabChange: (selectedTab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ selectedTab, onTabChange }) => {
  const handleTabChange = (tab: string) => {
    onTabChange(tab);
  };

  return (
    <section className="mb-5 flex w-full justify-center">
      <div
        className={` cursor-pointer  ${
          selectedTab === "all"
            ? "border-b-4 border-default-900"
            : "text-default-500"
        } flex-1 transition duration-300 ease-in-out`}
        onClick={() => handleTabChange("all")}
      >
        <div className="mb-2 flex justify-center font-semibold">All</div>
      </div>
      <div
        className={` cursor-pointer  ${
          selectedTab === "friends"
            ? "border-b-4 border-default-900"
            : "text-default-500"
        } duration-30 flex-1 transition ease-in-out`}
        onClick={() => handleTabChange("friends")}
      >
        <div className="mb-2 flex justify-center font-semibold">Friends</div>
      </div>
    </section>
  );
};

export default Tabs;
