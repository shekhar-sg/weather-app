"use client";
import { styled } from "@mui/system";
import Image from "next/image";
import { ComponentProps } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export const MaterialImage = styled(Image)({});
export const MaterialSwiper = styled(Swiper)({});
export const MaterialSwiperSlide = styled(SwiperSlide)({});

// Types
export type MaterialImageProps = ComponentProps<typeof MaterialImage>;
export type MaterialSwiperProps = ComponentProps<typeof MaterialSwiper>;
export type MaterialSwiperSlideProps = ComponentProps<
  typeof MaterialSwiperSlide
>;
