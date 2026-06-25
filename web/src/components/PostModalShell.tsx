"use client";

import { useRouter } from "next/navigation";

export function PostModalShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Закрыть"
        onClick={() => router.back()}
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
      />

      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div
          className="
            relative h-[88vh] w-full max-w-6xl overflow-hidden
            rounded-[2rem] bg-white shadow-[0_30px_120px_rgba(0,0,0,0.28)]
          "
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => router.back()}
            className="
              absolute right-4 top-4 z-20 flex h-10 w-10 items-center
              justify-center rounded-full bg-black/55 text-white backdrop-blur
              transition hover:bg-black/75
            "
          >
            ✕
          </button>

          <div className="h-full overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}
