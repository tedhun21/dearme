"use client";

import React from "react";

export default function New({
  setPostUploaded,
}: {
  setPostUploaded: (status: boolean) => void;
}) {
  const handleClick = () => {
    window.scrollTo(0, 0);
    setPostUploaded(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="absolute z-10 rounded-2xl bg-default-500 px-4 py-1 text-white"
      >
        <span>new</span>
      </button>
    </>
  );
}
