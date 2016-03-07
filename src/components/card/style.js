import {GREY3, GREY7} from '../../colors'

export default props => ({
  backgroundColor: props.background || GREY3,
  color: props.color || GREY7,
  padding: '5%',
  flex: '1 auto'
});
