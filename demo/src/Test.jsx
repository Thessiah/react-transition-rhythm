import * as React from 'react';
import { Transition } from '../../src/index'

export class Test extends React.Component {
  onTransitionEnd = this.secondTransition
  state = {
    x: 100,
    y: 100,
    backgroundColor: 'blue'
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
      x: 300,
      y: 300
    })
  }
  thirdTransition = () => {
    this.onTransitionEnd = this.firstTransition
    this.setState({
      x: 100,
      y: 100
    })
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
          onClick={this.firstTransition}
        />
        <Transition
          onTransitionTrigger={() => {
            this.setState({backgroundColor: 'blue'})
          }}
          onTransitionStart={() => {
            this.setState({backgroundColor: 'purple'})
          }}
          onTransitionEnd={()=>{
            this.onTransitionEnd()
          }}
          style={{
            transition: 'transform 1s ease-out 200ms',
            transform: `translate3d(${x}px, ${y}px, 0)`,
            backgroundColor,
            width: 100,
            height: 100,
          }}
        />
      </div>
    )
  }
}