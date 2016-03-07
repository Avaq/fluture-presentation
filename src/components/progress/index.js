import React, {createClass, PropTypes as T} from 'react';
import createStyles from './style';

const Progress = createClass({

  propTypes: {
    style: T.object
  },

  render(){
    const style = createStyles(this.props, this.state);
    return <div style={this.props.style}>
      <span style={style.bar} />
      <span style={style.progress} />
    </div>
  }

});

export default Progress;
