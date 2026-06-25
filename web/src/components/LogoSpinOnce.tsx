"use client";

import { useEffect } from "react";

const KEY = "ap_logo_spin_done_v1";

export function LogoSpinOnce() {
  useEffect(() => {
    try {
      const done = localStorage.getItem(KEY) === "1";
      if (done) return;

      document.documentElement.classList.add("logo-spin-once");
      localStorage.setItem(KEY, "1");

      window.setTimeout(() => {
        document.documentElement.classList.remove("logo-spin-once");
      }, 1600);
    } catch {
      // ничего
    }
  }, []);

  return null;
}
