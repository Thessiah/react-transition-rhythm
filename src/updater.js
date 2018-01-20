let transitions = [];
let timer = null;

export const triggerTransition = (transition) => {
  if(!transition.ended || transition.reaped) {
    transitions.push(transition);
    if(transitions.length === 1) {
      timer = window.requestAnimationFrame(update)
    }
  }
  transition.triggerTime = window.performance.now();
  transition.started = false;
  transition.ended = false;
  transition.reaped = false;
  transition.triggered = true;
  transition.trigger && transition.trigger();
  if(!transition.delay) {
    transition.started = true;
    transition.start && transition.start();
  }
}

const update = (time) => {
  let reapedCount = 0;
  transitions.forEach((transition, index) => {
    if(!transition.started && transition.delay <= time - transition.triggerTime) {
      transition.started = true;
      transition.start && transition.start();
    }
    if(transition.duration <= time - transition.triggerTime) {
      if(!transition.ended) {
        transition.ended = true;
        transition.end && transition.end();
      }
      else {
        transition.reaped = true;
      }
    }
    transition.reaped && reapedCount++;
  })
  if(reapedCount > 0) {
    const newTransitions = new Array(transitions.length - reapedCount)
    let i = 0;
    transitions.forEach((transition) => {
      if(!transition.reaped) {
        newTransitions[i++] = transition;
      }
    })
    transitions = newTransitions;
  }
  if(transitions.length > 0) {
    timer = window.requestAnimationFrame(update)
  }
}