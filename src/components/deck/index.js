import React, {createClass, PropTypes as T} from 'react';
import Controls from '../controls';
import Progress from '../progress';
import createStyles from './style';

const Deck = createClass({

  propTypes: {
    children: T.arrayOf(T.element).isRequired
  },

  getInitialState(){
    return {
      slide: 0
    }
  },

  onPrev(){
    this.setState({
      slide: this.state.slide - 1
    });
  },

  onNext(){
    this.setState({
      slide: this.state.slide + 1
    });
  },

  render(){
    const total = this.props.children.length - 1;
    const {slide} = this.state;
    const style = createStyles(this.props, this.state);
    const card = this.props.children[slide];
    return <div style={style.wrapper}>
      <Controls
        style={style.controls}
        hasPrev={slide > 0}
        hasNext={slide < total}
        onPrev={this.onPrev}
        onNext={this.onNext}
      />
      <Progress style={style.progress} percentage={slide / total} color={card.props.background} />
      {card}
    </div>
  }

});

export default Deck;
