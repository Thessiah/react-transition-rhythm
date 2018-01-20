import * as React from 'react';
import { Transition } from '../../src/index'

export class Test extends React.Component {
  onTransitionEnd = this.secondTransition
  state = {
    x: 100,
    y: 100,
    backgroundColor: 'blue',
    opacity: 1,
    transition: `transform 1s ease-in-out, opacity 300ms ease-in-out`
  }
  componentDidMount() {
    window.requestAnimationFrame(this.firstTransition);
    window.requestAnimationFrame(this.setOpacity);
  }
  firstTransition = () => {
    this.onTransitionEnd = this.secondTransition;
    this.setState({
      x: 500,
      y: 100
    })
  }
  secondTransition = () => {
    this.onTransitionEnd = this.thirdTransition;
    this.setState({
      x: 500,
      y: 500
    })
  }
  thirdTransition = () => {
    this.onTransitionEnd = this.fourthTransition
    this.setState({
      x: 100,
      y: 500
    })
  }
  fourthTransition = () => {
    this.onTransitionEnd = this.firstTransition
    this.setState({
      x: 100,
      y: 100
    })
  }
  setOpacity = () => {
    this.setState((prevState) => ({
      opacity: prevState.opacity === 1 ? .5 : 1
    }))
  }
  toggleTransition = () => {
    this.setState((prevState) => ({
      transition: prevState.transition === `transform 1s ease-in-out, opacity 300ms ease-in-out`
        ? `transform 500ms ease-in-out`
        : `transform 1s ease-in-out, opacity 300ms ease-in-out`
    }))
    this.setOpacity();
    // window.requestAnimationFrame(() => {
    //   debugger;
    // })
    // this.setOpacity();
    // this.onTransitionEnd();
  }
  render = () => {
    const {
      x,
      y,
      backgroundColor
    } = this.state
    return (
      <div>
        <button 
          onClick={this.toggleTransition}
        />
        <Transition
          onTransitionEnd={[()=>{
            this.onTransitionEnd()
          },
          ()=>{
            this.setOpacity()
          }]}
          style={{
            transition: this.state.transition,
            transform: `translate3d(${x}px, ${y}px, 0)`,
            opacity: this.state.opacity,
            backgroundColor,
            width: 100,
            height: 100,
          }}
        />
      </div>
    )
  }
}