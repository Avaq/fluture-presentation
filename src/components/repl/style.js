const dracula = {
  backgroundColor: '#282a36',
  color: '#f8f8f2'
};

const output = {
  ...dracula,
  flex: '1 100%',
  minHeight: '3em',
  padding: '10px'
};

export default () => ({
  wrapper: {
    ...dracula,
    display: 'flex',
    flexFlow: 'row wrap',
    fontSize: '1em',
    border: '5px solid grey',
    textAlign: 'left'
  },
  input: {
    flex: '1 60%'
  },
  compiled: {
    ...dracula,
    flex: '1 auto',
    overflow: 'hidden',
    fontSize: '0.7em',
    padding: '10px'
  },
  output: output,
  error: {
    ...output,
    color: 'red'
  },
  textArea: {
    minHeight: '15em'
  }
});
