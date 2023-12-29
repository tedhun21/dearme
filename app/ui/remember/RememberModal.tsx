/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { RememberItem } from "@/app/diary/remember/page";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";

import WeatherCloudy from "@/public/diary/WeatherCloudy";
import EditRemember from "@/public/remember/EditRemeber";
import DeleteRemember from "@/public/remember/DeleteRemember";
import CloseRemember from "@/public/remember/CloseRemember";

interface RmemberModalProps {
  selectedItem: RememberItem | null;
  open: boolean;
  handleClose: () => void;
}

export default function RememberModal({
  selectedItem,
  open,
  handleClose,
}: RmemberModalProps) {
  // tags
  const [showAllTags, setShowAllTags] = useState(false);

  const handleShowMoreTags = () => {
    setShowAllTags(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <Box className="relative left-1/2 top-1/2 w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] bg-black">
        {/* 버튼 */}
        <section>
          <button
            className="absolute right-4 top-4 z-10  "
            onClick={handleClose}
          >
            <CloseRemember className="h-5 w-5 fill-current text-default-400 hover:text-default-800" />
          </button>
          <button className="absolute right-12 top-4 z-10 ">
            <DeleteRemember className="h-5 w-5 fill-current text-default-400 hover:text-default-400" />
          </button>
          <button className="absolute right-20 top-4 z-10 ">
            <EditRemember className="h-5 w-5 fill-current text-default-400 hover:text-default-400" />
          </button>
        </section>

        {/* 일기 이미지 */}
        {selectedItem && (
          <article className="mb-5 mt-5 flex  w-full  flex-col rounded ">
            {/* 이미지 있을 경우에만 (images &&)*/}
            {selectedItem.imageUrl.length !== 0 && (
              <Swiper
                pagination={true}
                modules={[Pagination]}
                className=" mb-5 w-full object-cover"
              >
                {selectedItem.imageUrl.map((image: any, index: any) => (
                  <SwiperSlide
                    key={index}
                    className=" flex items-center justify-center "
                  >
                    <img
                      src={image}
                      alt={`Diary Image ${index}`}
                      className="h-[400px] w-full cursor-pointer rounded-t-2xl object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* 날짜 & 제목 & tags */}
            <section className="m-5 ">
              <h1 className="mb-3  whitespace-pre-wrap text-base font-normal text-white">
                {selectedItem.date}
              </h1>
              <h1 className="mb-3 text-lg font-semibold text-white">
                {'"' + selectedItem.title + '"'}
              </h1>
              {selectedItem.tags
                .slice(0, showAllTags ? selectedItem.tags.length : 3)
                .map((tagItem, index) => (
                  <div
                    key={index}
                    className="border-1 mb-2 mr-3 inline-block rounded-full border-default-400 bg-default-300 px-2 py-0.5 text-sm font-semibold text-default-800"
                  >
                    {tagItem}
                  </div>
                ))}
              {!showAllTags && selectedItem.tags.length > 3 && (
                <div
                  className="mr-3 mt-1 inline-block cursor-pointer rounded-full border-2 border-default-400 bg-default-300 px-2 py-0.5 text-base font-semibold text-default-800 hover:bg-gray-300 focus:outline-none focus:ring-2"
                  onClick={handleShowMoreTags}
                >
                  +{selectedItem.tags.length - 3}
                </div>
              )}
            </section>

            {/* 일기 내용 */}
            <section className="m-5">
              <div className="mb-5 text-base font-light text-white">
                {selectedItem.contents}
              </div>
              <div className="mb-5 flex w-full items-center justify-end">
                <WeatherCloudy className="mr-2 h-5 w-5 fill-current text-white" />
                <span className="text-sm font-medium text-white">
                  서울 마포구 , 9.2°C
                </span>
              </div>
            </section>
          </article>
        )}
      </Box>
    </Modal>
  );
}
