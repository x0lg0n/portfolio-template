export interface FeedSource {
  id: "medium" | "devto" | "hashnode" | "substack";
  name: string;
  handle: string;
}

export const FEED_SOURCES: FeedSource[] = [
  {
    id: "medium",
    name: "Medium",
    handle: "x0lg0n",
  },
  {
    id: "devto",
    name: "dev.to",
    handle: "x0lg0n",
  },
  {
    id: "hashnode",
    name: "Hashnode",
    handle: "",
  },
  {
    id: "substack",
    name: "Substack",
    handle: "x0lg0n",
  },
];
