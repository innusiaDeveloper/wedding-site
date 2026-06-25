import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function Button({ children, className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center
        rounded-2xl
           bg-brand-green
    px-6 py-3

    font-ui text-sm font-medium
    text-brand-paper

    shadow-sm

    transition-all duration-300

    hover:bg-brand-hover

    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-brand-green/35

    ${className}
  `}
    >
      {children}
    </button>
  );
}
