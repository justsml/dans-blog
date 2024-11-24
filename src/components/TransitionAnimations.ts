export interface TransitionAnimation {
  name: string; // The name of the keyframe
  delay?: number | string;
  duration?: number | string;
  easing?: string;
  fillMode?: string;
  direction?: string;
}

export interface TransitionAnimationPair {
  old: TransitionAnimation | TransitionAnimation[];
  new: TransitionAnimation | TransitionAnimation[];
}

export interface TransitionDirectionalAnimations {
  forwards: TransitionAnimationPair;
  backwards: TransitionAnimationPair;
}

export const bumpAnim: TransitionAnimationPair = {
  old: {
    name: 'bump',
    duration: '0.5s',
    easing: 'ease-in',
    direction: 'reverse',
  },
  new: {
    name: 'bump',
    duration: '0.5s',
    easing: 'ease-in-out',
  },
};

export const bumpTransition: TransitionDirectionalAnimations = {
  forwards: bumpAnim,
  backwards: bumpAnim,
};

export const slideUpAnim: TransitionAnimationPair = {
  old: {
    name: 'slideUp',
    duration: '0.75s',
    easing: 'ease-in',
    direction: 'reverse',
  },
  new: {
    name: 'slideUp',
    duration: '0.75s',
    easing: 'ease-in-out',
  },
};

export const slideUpTransition: TransitionDirectionalAnimations = {
  forwards: slideUpAnim,
  backwards: slideUpAnim,
};

export const moveInOutAnim: TransitionAnimationPair = {
  old: {
    name: 'move-in',
    duration: '0.35s',
    easing: 'ease-in',
    direction: 'reverse',
  },
  new: {
    name: 'move-out',
    duration: '0.35s',
    easing: 'ease-in-out',
  },
};

export const moveInOutTransition: TransitionDirectionalAnimations = {
  forwards: moveInOutAnim,
  backwards: moveInOutAnim,
};
