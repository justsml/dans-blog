import { QuizPost } from "../../types.ts";
import { FilterForm } from "./FilterForm.tsx";
import { QuizCard } from "./QuizCard.tsx";

export const QuizGrid = ({
  quizList,
  subCategoryList,
  subCategoryCounts,
}: {
  quizList: QuizPost[];
  subCategoryList: string[];
  subCategoryCounts: Record<string, number>;
}) => {
  const onFiltersChanged = (value: string[]) => {
    console.log("Filter changed!", value);
  };

  return (
    <>
      <div className="filter-toolbar">
        <FilterForm
          onOpenChange={console.log}
          onSearchChange={onFiltersChanged}
        />
      </div>
      <div className={"quiz-list"}>
        {quizList
          .filter(({ data: { unlisted, hidden } }) => hidden !== true)
          .map((props, index) => (
            <QuizCard
              article={props}
              subCategoryCounts={subCategoryCounts}
              subCategoryList={subCategoryList}
            />
          ))}
      </div>
    </>
  );
};
