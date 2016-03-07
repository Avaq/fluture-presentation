import {GREY1} from '../../colors';

export default () => ({
  wrapper: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: '2em',
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  controls: {
    backgroundColor: GREY1,
    flex: '0 20px'
  },
  progress: {
    flex: '0 20px'
  }
});
