"use client";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";

type Props = {
  chapter: Chapter;
  chapterIndex: number;
  disableFetchChapterInfo: () => void;
  fetchChapterInfo: boolean;
  // completedChapters: Set<String>;
  // setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
  completedChapters: string[];
  setCompletedChapters: React.Dispatch<React.SetStateAction<string[]>>;
};

const ChapterCard = ({
  chapter,
  chapterIndex,
  disableFetchChapterInfo,
  fetchChapterInfo,
  completedChapters,
  setCompletedChapters,
}: Props) => {
  const addChapterToCompleted = useCallback(() => {
    setCompletedChapters((prev) => {
      const chaptersSet = new Set(prev);
      chaptersSet.add(chapter.id);

      return Array.from(chaptersSet);
    });
  }, [chapter.id, setCompletedChapters]);

  const { data, error, isFetching, isSuccess, isError } = useQuery({
    queryKey: ["chapterInfo", chapter.id],
    queryFn: async () => {
      const response = await axios.get(
        `/api/chapter/getInfo?chapterId=${chapter.id}`
      );
      return response.data;
    },
    onSuccess: () => {
      addChapterToCompleted();
      disableFetchChapterInfo();
    },
    onError: () => {},
    enabled: fetchChapterInfo && !chapter.videoId,
    refetchOnWindowFocus: false,
    retry: false,
  });

  React.useEffect(() => {
    if (chapter.videoId) {
      addChapterToCompleted();
    }
  }, [chapter]);

  return (
    <div
      key={chapter.id}
      className={cn("px-4 py-2 mt-2 rounded flex justify-between", {
        "bg-secondary": !isError && !isSuccess && !chapter.videoId,
        "bg-red-500": isError,
        "bg-green-500": isSuccess || Boolean(chapter.videoId),
      })}
    >
      <h5>{chapter.name}</h5>
      {isFetching && <Loader2 className="animate-spin" />}
    </div>
  );
};

export default ChapterCard;
