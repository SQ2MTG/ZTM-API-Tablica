import React from 'react';

export const TramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="11" width="18" height="10" rx="3" />
    <path d="M4 11V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7" />
    <path d="M4 21v-2" />
    <path d="M20 21v-2" />
    <path d="M12 2v2" />
    <path d="M4 4h16" />
    <path d="M8 16h8" />
  </svg>
);
