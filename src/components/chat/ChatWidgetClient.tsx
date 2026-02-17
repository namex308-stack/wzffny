"use client";

import dynamic from "next/dynamic";

const ChatWidget = dynamic(
  () => import("@/components/chat/ChatWidget").then((mod) => mod.ChatWidget),
  { ssr: false, loading: () => null },
);

export function ChatWidgetClient() {
  return <ChatWidget />;
}
