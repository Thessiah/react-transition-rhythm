import * as React from 'react';
import { Transition } from '../../src/index'

export class TestTwo extends React.Component {
  render() {
    let squares = new Array(20);
    for(var i = 0; i < 200; i++) {
      squares[i] = (
        <Square
          key={i} 
        />
      )
    }
    return squares;
  }
}

class Square extends React.Component {
  state = {
    x: 100,
    y: 100,
    ratation: 0,
    scale: 1,
    opacity: 1,
    color: '#'+Math.floor(Math.random()*16777215).toString(16)
  }
  componentWillMount() {
    this.reshuffleOpacity();
    this.reshuffleTransform();
  }
  reshuffleTransform = () => {
    const x = (Math.random() * 400);
    const y = (Math.random() * 400);
    const scale = Math.random() / 2 + .5;
   
    const rotation = Math.random() * 360;
    this.setState({
      x,
      y,
      scale,
      rotation
    })
  }
  reshuffleOpacity = () => {
    const opacity = Math.random() + .1;
    this.setState({
      opacity
    })
  }
  initialTransition = () => {
    this.reshuffleOpacity();
    this.reshuffleTransform();
  }

  render = () => {
    const {
      x,
      y,
      rotation,
      scale,
      opacity
    } = this.state
    return (
      <Transition
        onMount={this.initialTransition}
        onTransitionEnd={[
          this.reshuffleTransform,
          this.reshuffleOpacity
        ]}
        endDelay={[200]}
        style={{
          position: 'absolute',
          transition: `transform 2s ease-in-out, opacity 200ms ease-in-out`,
          transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`,
          opacity: opacity,
          backgroundColor: this.state.color,
          width: 20,
          height: 20,
        }}
      />
    )
  }
}

