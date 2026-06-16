"use client";

import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";

export function SiteHeader() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
    </>
  );
}
