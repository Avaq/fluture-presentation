import React, {createClass, PropTypes as T} from 'react';

const Controls = createClass({

  propTypes: {
    hasPrev: T.bool,
    hasNext: T.bool,
    onPrev: T.func,
    onNext: T.func,
    style: T.object
  },

  render(){
    return <div style={this.props.style}>
      <button onClick={this.props.onPrev} disabled={!this.props.hasPrev}>prev</button>
      <button onClick={this.props.onNext} disabled={!this.props.hasNext}>next</button>
    </div>
  }

});

export default Controls;
