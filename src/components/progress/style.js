import {GREY1, GREY3} from '../../colors';

const bar = {
  width: '100%',
  backgroundColor: GREY1,
  position: 'absolute',
  left: 0,
  height: 20 //:(
}

export default ({percentage, color}) => ({

  bar: bar,

  progress: {
    ...bar,
    width: `${Math.round(percentage * 100)}%`,
    backgroundColor: color || GREY3
  }

});
