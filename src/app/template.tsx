import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="app-template flex flex-col flex-1">{children}</div>;
}
