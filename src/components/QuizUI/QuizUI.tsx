import { ListTodoIcon, RefreshCcwIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import "./index.css";
import "./icons.css";
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Context for quiz-wide state
export const QuizContext = createContext<{
  setTotalQuestions: (n: number) => void;
  setCorrectAnswers: (n: number) => void;
}>({
  setTotalQuestions: () => {},
  setCorrectAnswers: () => {},
});

// Context for single-question mode navigation
export const QuizNavigationContext = createContext<{
  currentIndex: number;
  totalQuestions: number;
  goToQuestion: (index: number, direction?: 'next' | 'prev') => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  answeredQuestions: Set<number>;
  markAnswered: (index: number, correct: boolean) => void;
}>({
  currentIndex: 0,
  totalQuestions: 0,
  goToQuestion: () => {},
  nextQuestion: () => {},
  prevQuestion: () => {},
  answeredQuestions: new Set(),
  markAnswered: () => {},
});

export default function QuizUI({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [correctSet, setCorrectSet] = useState<Set<number>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const confettiContainerRef = useRef<HTMLDivElement>(null);

  // Count children to get total questions
  useEffect(() => {
    const count = React.Children.count(children);
    setTotalQuestions(count);
  }, [children]);

  // 3D parallax transition between questions
  const transitionToQuestion = useCallback((fromIndex: number, toIndex: number, direction: 'next' | 'prev' = 'next') => {
    if (isTransitioning || fromIndex === toIndex) return;
    
    setIsTransitioning(true);
    
    const container = containerRef.current;
    if (!container) return;
    
    const currentSlide = container.querySelector(`.quiz-question-slide[data-question-index="${fromIndex}"]`);
    const nextSlide = container.querySelector(`.quiz-question-slide[data-question-index="${toIndex}"]`);
    
    if (!currentSlide || !nextSlide) {
      setIsTransitioning(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentSlide, { 
          autoAlpha: 0, 
          pointerEvents: "none",
          position: "absolute",
          z: -100,
          rotationX: direction === 'next' ? 10 : -10,
        });
        gsap.set(nextSlide, { 
          position: "relative",
          z: 0,
          rotationX: 0,
        });
        setIsTransitioning(false);
      }
    });

    // Exit animation for current slide
    tl.to(currentSlide, {
      duration: 0.4,
      autoAlpha: 0,
      z: -100,
      rotationX: direction === 'next' ? 15 : -15,
      y: direction === 'next' ? -30 : 30,
      scale: 0.95,
      ease: "power2.in",
    })
    // Enter animation for next slide
    .fromTo(nextSlide, {
      autoAlpha: 0,
      z: 100,
      rotationX: direction === 'next' ? -10 : 10,
      y: direction === 'next' ? 40 : -40,
      scale: 0.95,
    }, {
      autoAlpha: 1,
      z: 0,
      rotationX: 0,
      y: 0,
      scale: 1,
      ease: "power3.out",
    }, 0.15);

    // Update position styles
    gsap.set(nextSlide, { 
      position: "absolute",
      pointerEvents: "auto",
    });
  }, [isTransitioning]);

  const goToQuestion = useCallback((index: number, direction?: 'next' | 'prev') => {
    if (index >= 0 && index < totalQuestions && !isTransitioning) {
      const dir = direction || (index > currentIndex ? 'next' : 'prev');
      transitionToQuestion(currentIndex, index, dir);
      setCurrentIndex(index);
    }
  }, [totalQuestions, currentIndex, isTransitioning, transitionToQuestion]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1 && !isTransitioning) {
      transitionToQuestion(currentIndex, currentIndex + 1, 'next');
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, totalQuestions, isTransitioning, transitionToQuestion]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      transitionToQuestion(currentIndex, currentIndex - 1, 'prev');
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, isTransitioning, transitionToQuestion]);

  const markAnswered = useCallback((index: number, correct: boolean) => {
    setAnsweredQuestions(prev => new Set([...prev, index]));
    if (correct) {
      setCorrectSet(prev => new Set([...prev, index]));
    }
  }, []);

  // Confetti effect for correct answers
  const fireConfetti = useCallback(() => {
    if (!confettiContainerRef.current) return;

    const container = confettiContainerRef.current;
    const particles: HTMLDivElement[] = [];
    const colors = ['#82ff9d', '#ff6b9d', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94', '#74b9ff'];

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 8 + 4}px;
        height: ${Math.random() * 8 + 4}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none;
        left: 50%;
        top: 50%;
        opacity: 0;
      `;
      container.appendChild(particle);
      particles.push(particle);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        particles.forEach(p => p.remove());
      }
    });

    tl.to(particles, {
      opacity: 1,
      duration: 0.1,
      stagger: 0.02,
      ease: "power1.out"
    })
    .to(particles, {
      x: (i) => (Math.random() - 0.5) * 400,
      y: (i) => (Math.random() - 0.5) * 400 - 100,
      rotation: (i) => Math.random() * 720 - 360,
      scale: (i) => Math.random() * 0.5 + 0.5,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.02
    }, 0);
  }, []);

  // Shake effect for wrong answers
  const triggerShake = useCallback((element: HTMLElement) => {
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
  }, []);

  // Expose shake and confetti to child components
  useEffect(() => {
    (window as any).__quizEffects = { fireConfetti, triggerShake, markAnswered };
    return () => {
      delete (window as any).__quizEffects;
    };
  }, [fireConfetti, triggerShake, markAnswered]);

  // Update counts
  useEffect(() => {
    const updateCounts = () => {
      setCorrectAnswers(correctSet.size);
    };
    updateCounts();
    (window as any).__updateCounts = updateCounts;
  }, [correctSet]);

  const isAllCorrect = totalQuestions > 0 && correctSet.size === totalQuestions;

  return (
    <QuizContext.Provider value={{ setTotalQuestions, setCorrectAnswers }}>
      <QuizNavigationContext.Provider value={{
        currentIndex,
        totalQuestions,
        goToQuestion,
        nextQuestion,
        prevQuestion,
        answeredQuestions,
        markAnswered,
      }}>
        <section className="full-section full-width quiz-section-modern"
          style={{
            "--ec-codePadInl": "0.75rem",
          }}>
          <div className="quiz-ui quiz-ui-modern" ref={containerRef}>
            {/* Progress bar */}
            <div className="quiz-progress-bar">
              <div className="quiz-progress-track">
                <div 
                  className="quiz-progress-fill"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
              <div className="quiz-progress-info">
                <span className="quiz-progress-text">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span className="quiz-score-text">
                  Score: {correctSet.size}/{totalQuestions}
                </span>
              </div>
            </div>

            {/* Question container with animation */}
            <div className="quiz-questions-container">
              {React.Children.map(children, (child, index) => (
                <div 
                  key={index}
                  className={`quiz-question-slide ${index === currentIndex ? 'active' : ''}`}
                  data-question-index={index}
                  style={{
                    position: index === currentIndex ? 'relative' : 'absolute',
                    opacity: index === currentIndex ? 1 : 0,
                    pointerEvents: index === currentIndex ? 'auto' : 'none',
                    transform: index === currentIndex 
                      ? 'translateZ(0) rotateX(0)' 
                      : 'translateZ(-100px) rotateX(10deg)',
                  }}
                >
                  {child}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="quiz-navigation">
              <button 
                className="quiz-nav-btn quiz-nav-prev"
                onClick={prevQuestion}
                disabled={currentIndex === 0 || isTransitioning}
                aria-label="Previous question"
              >
                <ChevronLeftIcon size={20} />
                <span>Previous</span>
              </button>
              
              {/* Question dots */}
              <div className="quiz-dots">
                {Array.from({ length: totalQuestions }, (_, i) => (
                  <button
                    key={i}
                    className={`quiz-dot ${i === currentIndex ? 'active' : ''} ${
                      answeredQuestions.has(i) ? (correctSet.has(i) ? 'correct' : 'incorrect') : ''
                    }`}
                    onClick={() => goToQuestion(i)}
                    aria-label={`Go to question ${i + 1}`}
                  />
                ))}
              </div>

              <button 
                className="quiz-nav-btn quiz-nav-next"
                onClick={nextQuestion}
                disabled={currentIndex === totalQuestions - 1 || isTransitioning}
                aria-label="Next question"
              >
                <span>Next</span>
                <ChevronRightIcon size={20} />
              </button>
            </div>

            {/* Confetti container */}
            <div className="confetti-container" ref={confettiContainerRef} />
          </div>

          {/* Score bar */}
          <div className={`score screenshot-hidden ${isAllCorrect ? 'success all-correct' : ''}`}>
            <button className="btn reset-quiz">
              <RefreshCcwIcon className="icon" />
              <span>Reset</span>
            </button>
            <div className="score-wrapper">
              <span>Quiz Score: </span>
              <label>{correctSet.size}/{totalQuestions}</label>
            </div>
            <div className="congrats-message">
              <h3>Congrats! Quiz completed.</h3>
            </div>
            <div className="view-all-link">
              <a href="/challenges/" className="btn-view-all">
                <ListTodoIcon className="icon" />
                <span>All Quizzes</span>
              </a>
            </div>
          </div>
        </section>
      </QuizNavigationContext.Provider>
    </QuizContext.Provider>
  );
}
