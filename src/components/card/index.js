import React, {createClass, PropTypes as T} from 'react';
import createStyles from './style';

const Card = createClass({

  propTypes: {
    children: T.any,
    color: T.string,
    background: T.string
  },

  render(){
    return <div style={createStyles(this.props, this.state)}>
      {this.props.children}
    </div>
  }

});

export default Card;
