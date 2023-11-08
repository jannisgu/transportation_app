"use client"

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button className="back-to-search" onClick={() => router.push("/")}>
      Back to Search
    </button>
  );
};

export default BackButton;
