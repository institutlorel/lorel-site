"use client";

import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function SiteHeader({ dict }: { dict: Dictionary }) {
  return (
    <>
      <AnnouncementBar dict={dict} />
      <Navbar dict={dict} />
    </>
  );
}
