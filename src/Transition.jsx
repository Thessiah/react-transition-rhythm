import * as React from 'react';
import { triggerTransition } from './updater'

export class Transition extends React.Component {
  transitions = [];
  transitionMap = {};

  componentWillMount = () => {
    this.processProps(this.props);
  }
  componentDidMount = () => {
    if(this.props.onMount) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(this.props.onMount)
      })
    }
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      style
    } = this.props;
    const {
      style: nextStyle,
      onTransitionTrigger
    } = nextProps
    if(style && nextStyle && nextStyle.transition) {
      if(style.transition !== nextStyle.transition) {
        this.processProps(nextProps)
      }
      this.transitions.forEach((transition, index) => {
        if(
          transition.property &&
          style[transition.property] !== nextStyle[transition.property]
        ) {
          triggerTransition(transition)
        }
      })
    }
  }
  processProps = ({style, endDelay, onTransitionTrigger, onTransitionStart, onTransitionEnd}) => {
    if(style && style.transition) {
      const transitionStrings = style.transition.split(',');
      const transitions = new Array(transitionStrings.length);
      const transitionMap = {};
      transitionStrings.forEach((transitionString, index) => {
        transitionMap[transitionString] = index;
        if(this.transitionMap[transitionString] !== undefined) {
          transitions[index] = this.transitions[this.transitionMap[transitionString]]
        }
        else {
          const [
            property,
            duration,
            timingFunction,
            delay
          ] = transitionString.replace(/^\s+|\s+$/g, '').split(' ') 
          transitions[index] = {
            property,
            duration: this.processTime(duration),
            delay: this.processTime(delay),
            endDelay: this.processTime(this.processArrayItem(endDelay, index)),

            triggerTime: 0,
            triggered: false,
            started: false,
            ended: false,
            reaped: false,
            trigger: this.processArrayItem(onTransitionTrigger, index),
            start: this.processArrayItem(onTransitionStart, index),
            end: this.processArrayItem(onTransitionEnd, index)
          }
        }
      })
      Object.entries(this.transitionMap).forEach(([transitionString, index]) => {
        if(transitionMap[transitionString] === undefined) {
          const transition = this.transitions[index];
          if(transition.triggered) {
            if(!transition.started) {
              transition.start && transition.start(); 
              transition.started = true;
            }
            if(!transition.ended) {
              transition.end && transition.end();
              transition.ended = true;
            }
            transition.reaped = true;
          }
        }
      })
      this.transitions = transitions;
      this.transitionMap = transitionMap;
    }
  }
  processArrayItem = (item, index) => {
    return item
      ? Array.isArray(item)
        ? item[index] !== undefined
          ? item[index]
          : null
        : item
      : null;
  } 
  processTime = (time) => {
    return Number.isInteger(time) 
      ? time
      : /\d+ms/.test(time) 
        ? parseInt(time.replace(/\D/g,''), 10)
        : /\d+s/.test(time)
          ? (parseInt(time.replace(/\D/g,''), 10) * 1000)
          : 0
  }
  render = () => {
    const {
      endDelay,
      onMount,
      onTransitionTrigger,
      onTransitionStart,
      onTransitionEnd,
      children,
      innerRef,
      ...other
    } = this.props;
    return (
      <div
        ref={innerRef}
        {...other}
      >
        {children}
      </div>
    )
  }
}
// {React.Children.map(children, (child) => {
//   return React.cloneElement(child, {
//     style: {
//       backgroundColor: 'black'
//     }
//   })
// })}