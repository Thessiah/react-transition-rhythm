import * as React from 'react';

export class Transition extends React.Component {
  timer = null;
  triggerTime = null;
  started = false;

  property = null;
  duration = null;
  timingFunction = null;
  delay = null;

  componentWillMount() {
    this.processProps(this.props);
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
      if(
        this.property &&
        style[this.property] !== nextStyle[this.property]
      ) {
        if(this.timer) {
          !this.started && this.start();
          this.end();
        }
        this.timer = window.requestAnimationFrame(this.update);
        this.triggerTime = window.performance.now();
        this.started = false;
        onTransitionTrigger && onTransitionTrigger();
        !this.delay && this.start();
      }
    }
  }
  processProps = ({style}) => {
    if(style && style.transition) {
      const [
        property,
        duration,
        timingFunction,
        delay
      ] = style.transition.split(' ') 
      this.property = property;
      this.duration = this.processTime(duration);
      this.timingFunction = timingFunction;
      this.delay = this.processTime(delay);
    }
  }
  processTime = (time) => {
    return /\d+ms/.test(time) 
      ? parseInt(time.replace(/\D/g,''), 10)
      : /\d+s/.test(time)
        ? (parseInt(time.replace(/\D/g,''), 10) * 1000)
        : 0
  }
  start = () => {
    const {
      onTransitionStart
    } = this.props
    this.started = true;
    onTransitionStart && onTransitionStart()
  }
  end = () => {
    const {
      onTransitionEnd
    } = this.props
    window.cancelAnimationFrame(this.timer);
    this.timer = null;
    this.triggerTime = null;
    onTransitionEnd && onTransitionEnd();
  }
  update = (time) => {
    if(!this.started && this.delay <= time - this.triggerTime) {
      this.start();
    }
    if(this.duration <= time - this.triggerTime) {
      this.end();
      return;
    }
    this.timer = window.requestAnimationFrame(this.update)
  }
  render = () => {
    const {
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