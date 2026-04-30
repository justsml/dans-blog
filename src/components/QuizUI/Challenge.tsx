import { navigate } from "astro:transitions/client";
import {
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Option } from "./types";
import { QuizContext } from "./QuizContext";
import classNames from "classnames";

import { slugify } from "../../shared/pathHelpers.ts";
import { QuestionStore } from "./QuestionStore.ts";
import { HintTooltip } from "./HintTooltip.tsx";
import { usePostHog } from "../PostHogEntry.tsx";

import clsx from "clsx";
import getGlobal from "@stdlib/utils-global";
import gsap from "gsap";

const global = getGlobal();
const SCREENSHOT_SCALE = 1.75;

/**
 * Challenge component
 */
export default function Challenge({
  children,
  title,
  group,
  question,
  options,
  explanation,
  index: questionIndex,
}: {
  children: ReactNode[] | ReactNode;
  index: number;
  title: string;
  group: string;
  question: string;
  options: Option[];
  explanation?: string;
  difficulty?: "easy" | "medium" | "hard" | "expert" | string;
  objectives?: string[];
  standards?: string[];
}) {
  const siteDomain = `DanLevy.net`;

  const { setTotalQuestions, setCorrectAnswers } = useContext(QuizContext);

  const challengeRef = useRef<HTMLDivElement>(null);
  const questionStoreRef = useRef<ReturnType<typeof QuestionStore> | null>(null);
  const optionsPanelRef = useRef<HTMLElement>(null);
  const explanationPanelRef = useRef<HTMLElement>(null);
  const explanationContentRef = useRef<HTMLParagraphElement>(null);
  const tallestOptionsHeightRef = useRef(0);
  const [challengeClass, setChallengeClass] = useState<string>("untouched");
  const [panelHeight, setPanelHeight] = useState<number>(SCREENSHOT_SCALE * 70 * options.length);

  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [explanationText, setExplanationText] = useState<string>(explanation!);
  const [tries, setTries] = useState<number>(0);
  const [pageLink, setPageLink] = useState<string>("");

  const updateCounts = () => {
    const questions = document.querySelectorAll("main .challenge");
    const correct = document.querySelectorAll("main .challenge.correct");
    setTotalQuestions(questions?.length);
    setCorrectAnswers(correct?.length);
    // @ts-ignore
    window?.__updateCounts();
  };

  useEffect(() => {
    if (!questionStoreRef.current) {
      questionStoreRef.current = QuestionStore(global?.location.pathname);
    }

    const link = global?.location?.pathname ?? "";
    setPageLink(siteDomain + link);
  }, [global?.location?.pathname]);

  useEffect(() => {
    if (!questionStoreRef.current) {
      questionStoreRef.current = QuestionStore(global?.location.pathname);
    }

    if (questionStoreRef.current) {
      questionStoreRef.current.addQuestion({
        title,
        group,
        question,
        index: questionIndex,
      });
      const isCorrect =
        questionStoreRef.current?.isCorrect({
          index: questionIndex,
        }) ?? undefined;

      const tries =
        questionStoreRef.current?.getTries({
          index: questionIndex,
        }) ?? 0;

      setTries(tries);
      setIsCorrect(isCorrect);
      setChallengeClass(
        isCorrect === true ? "correct" : isCorrect === false ? "incorrect" : "",
      );
    } else {
      console.error("QuestionStore is not initialized");
    }
  }, [title, group, question, questionIndex]);

  const { posthog } = usePostHog();
  
  const logEvent = (name: string, data: unknown) => {
    if (posthog) {
      posthog.capture(name, data);
    }
  };

  const IGNORE_HINTS = 1;
  const [showHint, setShowHint] = useState<string | false>(false);
  const [ignoreHintBy, setIgnoreHintBy] = useState<number>(IGNORE_HINTS);

  const triggerShake = (element: HTMLElement) => {
    gsap.set(element, { x: 0, rotation: 0 });
    const tl = gsap.timeline();
    for (let i = 0; i < 5; i++) {
      const intensity = 1 - (i * 0.15);
      tl.to(element, {
        x: (i % 2 === 0 ? -1 : 1) * 12 * intensity,
        rotation: (i % 2 === 0 ? -1 : 1) * 2 * intensity,
        duration: 0.06,
        ease: "power2.out"
      });
    }
    tl.to(element, {
      x: 0,
      rotation: 0,
      duration: 0.3,
      ease: "elastic.out(1, 0.5)"
    });
  };

  const handleAnswer = (option: Option) => {
    if (!questionStoreRef.current) {
      questionStoreRef.current = QuestionStore(global?.location.pathname);
    }

    questionStoreRef.current?.answerQuestion(
      {
        index: questionIndex,
      },
      option,
    );

    const currentQuestionTries =
      questionStoreRef.current?.getTries({ index: questionIndex }) ?? 0;
    const totalQuizTries = questionStoreRef.current?.sumOfTries() ?? currentQuestionTries;
    setTries(currentQuestionTries);

    setShowHint(false);
    if (option.isAnswer) {
      setChallengeClass("correct");
      setIsCorrect(true);
      if (challengeRef.current) {
        gsap.fromTo(challengeRef.current, 
          { scale: 1 },
          { 
            scale: 1.03, 
            duration: 0.15, 
            ease: "power2.out",
            yoyo: true,
            repeat: 1
          }
        );
      }
      // Notify the slide manager to celebrate correct answers.
      window.dispatchEvent(new CustomEvent("quiz-answer-correct", { detail: { index: questionIndex } }));
    } else {
      setChallengeClass("incorrect");
      setIsCorrect(false);
      if (challengeRef.current) {
        triggerShake(challengeRef.current);
      }
      if (ignoreHintBy > 0) {
        setIgnoreHintBy(ignoreHintBy - 1);
      }
      if (option.hint && ignoreHintBy < 1) {
        setShowHint(option.hint);
      }
    }
    logEvent("QuizAnswer", {
      isCorrect: option.isAnswer,
      option,
      question: question || "",
      title: title,
      questionIndex,
    });
    window.dispatchEvent(new CustomEvent("quiz-question-answered", {
      detail: {
        index: questionIndex,
        isCorrect: option.isAnswer,
        tries: currentQuestionTries,
        totalTries: totalQuizTries,
      },
    }));
    setTimeout(updateCounts, 20);
  };

  useEffect(() => {
    const syncPanelHeight = () => {
      const optionHeight = optionsPanelRef.current?.scrollHeight ?? 0;
      const explanationHeight = explanationContentRef.current?.scrollHeight ?? explanationPanelRef.current?.scrollHeight ?? 0;
      const fallbackHeight = SCREENSHOT_SCALE * 70 * options.length;

      if (optionHeight > 0) {
        tallestOptionsHeightRef.current = Math.max(
          tallestOptionsHeightRef.current,
          optionHeight,
        );
      }

      const nextHeight = Math.max(
        tallestOptionsHeightRef.current,
        explanationHeight,
        fallbackHeight,
      );

      if (nextHeight > 0) {
        setPanelHeight(nextHeight);
      }
    };

    syncPanelHeight();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => syncPanelHeight())
        : null;

    if (resizeObserver) {
      if (optionsPanelRef.current) resizeObserver.observe(optionsPanelRef.current);
      if (explanationContentRef.current) {
        resizeObserver.observe(explanationContentRef.current);
      } else if (explanationPanelRef.current) {
        resizeObserver.observe(explanationPanelRef.current);
      }
    }

    const island = challengeRef.current?.closest("astro-island");
    const visibilityObserver =
      island && typeof MutationObserver !== "undefined"
        ? new MutationObserver(() => {
            requestAnimationFrame(syncPanelHeight);
          })
        : null;

    if (visibilityObserver && island) {
      visibilityObserver.observe(island, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    window.addEventListener("resize", syncPanelHeight);
    const frame = requestAnimationFrame(syncPanelHeight);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", syncPanelHeight);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
    };
  }, [explanationText, isCorrect, options.length, showExplanation]);

  useEffect(() => {
    if (challengeRef.current) {
      const e =
        challengeRef.current.querySelector("div.explanation")?.innerHTML;
      if (e) setExplanationText(e);
    }
  }, [explanationText, challengeRef]);

  // GSAP entrance animation
  useEffect(() => {
    if (challengeRef.current) {
      gsap.fromTo(
        challengeRef.current,
        {
          autoAlpha: 0,
          y: 40,
          scale: 0.95,
          rotationX: -8,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, []);

  const sequenceNum = (questionIndex ?? 0) + 1;

  let correctCount = options.filter((o) => o.isAnswer).length;

  if (correctCount === 0) {
    console.error(
      "No correct answers found for question:",
      question,
      title,
      options,
    );
  }

  const _options = options
    .map((option) => {
      const isCurrentOptionCorrectAnswer = isCorrect && option.isAnswer;
      if (isCorrect && !option.isAnswer) return null;

      const _showHint = option.hint === showHint ? showHint : false;
      return (
        <div
          key={option.text}
          role="button"
          tabIndex={0}
          className={classNames(
            "option",
            {
              "correct-answer": isCurrentOptionCorrectAnswer,
            },
            "mx-auto",
          )}
          onClick={() => !isCorrect && handleAnswer(option)}
          onKeyDown={(event) => {
            if ((event.key === "Enter" || event.key === " ") && !isCorrect) {
              event.preventDefault();
              handleAnswer(option);
            }
          }}
        >
          <label>{option.text}</label>
          <HintTooltip
            title={`💡 Hint`}
            hint={_showHint ? _showHint : ""}
            showHint={_showHint ? true : false}
            onClose={(ignoreHintBy) => {
              if (ignoreHintBy && !isNaN(ignoreHintBy) && ignoreHintBy >= 1)
                setIgnoreHintBy(ignoreHintBy);
              setShowHint(false);
            }}
          />
        </div>
      );
    })
    .filter(Boolean);

  return (
    <div
      id={`qq-${sequenceNum}`}
      className={clsx("challenge challenge-modern", challengeClass)}
      ref={challengeRef}
      data-answer-count={tries}
      data-question-correct={isCorrect}
    >
      <div className="quiz-header">
        <div className="quiz-question-count">
          <a href={`#qq-${sequenceNum}`}>{sequenceNum}.</a>
          &#160;
        </div>
        <h2 className="quiz-title" id={slugify(title)}>
          <a href={`#qq-${sequenceNum}`}>{group}</a>
        </h2>
      </div>

      <div className="quiz-question">{question || children}</div>
      <aside className="quiz-hint-toggle">
        <div className="watermark">{pageLink}</div>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className={clsx("toggle-explainer", { open: showExplanation })}
        >
          {showExplanation ? "Hide" : "Show"} Explainer{" "}
        </button>
      </aside>
      <section
        className={clsx("quiz-body-panel", "card-container", {
          "card-flip": showExplanation,
        })}
        style={{
          height: `${panelHeight}px`,
          transition: "height 0.2s ease-in-out",
          overflowX: "clip",
          overflowY: "visible",
        }}
      >
        <section className="quiz-options card card-front" ref={optionsPanelRef}>
          {_options}
        </section>
        <section className={"explanation card card-back "} ref={explanationPanelRef}>
          <p
            className="help-box"
            ref={explanationContentRef}
            dangerouslySetInnerHTML={{ __html: explanationText }}
            onClick={(ev: MouseEvent<HTMLParagraphElement>) => {
              ev.preventDefault();
              const { clientX, clientY } = ev;
              const target: HTMLElement = ev.target as HTMLElement;

              const link: HTMLAnchorElement | null =
                target.tagName === "A"
                  ? (target as HTMLAnchorElement)
                  : target?.parentElement?.tagName === "A"
                    ? (target.parentElement as HTMLAnchorElement)
                    : null;
              const isTopRight = isTopRightCorner({ target }, 48);
              const isInCodeBlock = target.closest("code, pre");
              const isInParagraph = target.closest("p");
              if (isTopRight) {
                setShowExplanation(false);
                return false;
              }

              if (isInParagraph) {
                return false;
              }
              if (isInCodeBlock) {
                return false;
              }

              if (link) {
                navigate(link.href, { sourceElement: link });
                return true;
              }
            }}
          ></p>
        </section>
      </section>
    </div>
  );
}

function isTopRightCorner(
  {
    target,
  }: {
    target: HTMLElement | null;
    clientX?: number;
    clientY?: number;
  },
  hitBox = 48,
) {
  if (!target) return false;
  const before = getComputedStyle(target as HTMLElement, "::before");
  const { scrollY, scrollX } = global;

  if (before) {
    const top = Number(before.getPropertyValue("top").slice(0, -2));
    const right = Number(before.getPropertyValue("right").slice(0, -2));
    const left = Number(before.getPropertyValue("left").slice(0, -2));

    if (Number.isNaN(right) || Number.isNaN(top)) {
      return false;
    }
    if (top <= hitBox && right <= hitBox) {
      return true;
    }
  }
  return false;
}
