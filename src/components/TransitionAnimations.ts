export const bumpAnim = {
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

export const bumpTransition = {
  forwards: bumpAnim,
  backwards: bumpAnim,
};

export const slideUpAnim = {
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

export const slideUpTransition = {
  forwards: slideUpAnim,
  backwards: slideUpAnim,
};

export const moveInOutAnim = {
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

export const moveInOutTransition = {
  forwards: moveInOutAnim,
  backwards: moveInOutAnim,
};
