import { QuizPost } from "../../types.ts";
import { QuizFilter } from "./QuizFilter.tsx";
import { QuizCard } from "./QuizCard.tsx";
import { useEffect, useState } from "react";

export const QuizGrid = ({
  quizList: _quizList,
  subCategoryList,
  subCategoryCounts,
}: {
  quizList: QuizPost[];
  subCategoryList: string[];
  subCategoryCounts: Record<string, number>;
}) => {
  const [quizList, setQuizList] = useState<QuizPost[]>(_quizList);
  const [searchData, setSearchData] = useState<string[]>([]);
  const onFiltersChanged = (value: string[]) => {
    console.log("Filter changed!", value, searchData, quizList.length);
    setSearchData(value);
  };

  quizList.forEach((q) => {
    // const statuses = ["not-started", "started", "complete"];
    // if (statuses.every((s) => !q.data.tags.includes(s))) {
    //   // Mark the quiz status in it's TAGS - so we can filter by it
    //   if (q.data.correctCount === q.data.questionCount)
    //     q.data.tags.push("complete");
    //   else if ((q.data.correctCount ?? 0) > 0 || (q.data.tries ?? 0) > 0)
    //     q.data.tags.push("started");
    //   else q.data.tags.push("not-started");
    // }

    q.data.tags = q.data.tags.map((tag) => tag.toLowerCase());
  });

  useEffect(() => {
    if (searchData.length > 0) {
      setQuizList(
        quizList.filter(({ data: { tags } }) =>
          searchData.some((tag) => tags.includes(tag)),
        ),
      );
    } else {
      // restore the original list
      setQuizList(_quizList);
    }
  }, [searchData]);

  return (
    <>
      <div className="filter-toolbar">
        <QuizFilter
          onOpenChange={console.log}
          onSearchChange={onFiltersChanged}
        />
      </div>
      <div className={"quiz-list"}>
        {quizList
          .filter(({ data: { unlisted, hidden } }) => hidden !== true)
          .map((props, index) => (
            <QuizCard
              key={index}
              article={props}
              subCategoryCounts={subCategoryCounts}
              subCategoryList={subCategoryList}
            />
          ))}
      </div>
    </>
  );
};
