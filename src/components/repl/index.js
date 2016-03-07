/*eslint no-eval:0*/

import createStyles from './style';
import React, {createClass, createFactory, PropTypes as T} from 'react';
import ReactCodeMirror from 'react-code-mirror';
import es2015 from 'babel-preset-es2015';
import stage0 from 'babel-preset-stage-0';
import {
  encaseEither2, I, K, either, get, maybeToEither, compose, pipe, lines, Left,
  Right
} from 'sanctuary';
import {
  bind, flip, toString, map, replace, chain, either as oneOf, gte, __, reduce,
  max, length
} from 'ramda';

//CodeMirror :: Properties -> CodeMirror
const CodeMirror = createFactory(ReactCodeMirror);

//babelTransform :: Object -> String -> Either Error String
const babelTransform = flip(encaseEither2(I, bind(Babel.transform, Babel)));

//evaluate :: String -> Either Error String
const evaluate = compose(map(toString), x => {
  try{
    return Right(eval(x));
  }
  catch(e){
    return Left(e);
  }
});

//compile :: String -> Either Error String
const compile = babelTransform({
  presets: [es2015, stage0]
});

//getCompilationResults :: String -> {error: Error|null, compiled: String|null, output: String|null}
const getCompilationResults = pipe([
  compile,
  map(get(String, 'code')),
  chain(maybeToEither(new Error('Cannot compile'))),
  map(replace(/['"]use strict['"];\n*/, '')),
  eitherCompiled => {
    const eitherEvaluated = eitherCompiled.chain(evaluate);
    return {
      error: either(I, K(null), eitherEvaluated),
      compiled: either(K(null), I, eitherCompiled),
      output: either(K(null), I, eitherEvaluated)
    }
  }
]);

//isCompiledCodeTooLarge :: String -> Boolean
const isCompiledCodeTooLarge = pipe([lines, oneOf(
  pipe([map(length), reduce(max, 0), gte(__, 60)]),
  pipe([length, gte(__, 16)])
)]);

//Repl :: ReactClass
const Repl = createClass({

  propTypes: {
    value: T.string,
    hideCompiled: T.bool
  },

  getInitialState(){
    return {
      input: this.props.value || '',
      ...getCompilationResults(this.props.value || '')
    }
  },

  onChange(e){
    this.setState({
      input: e.target.value,
      ...getCompilationResults(e.target.value)
    });
  },

  componentWillReceiveProps(props){
    this.setState({
      input: props.value || '',
      ...getCompilationResults(props.value || '')
    })
  },

  render(){
    const style = createStyles(this.props, this.state);
    return <div style={style.wrapper}>
      <CodeMirror
        lineNumbers
        style={style.input}
        textAreaStyle={style.textArea}
        value={this.state.input}
        mode="javascript"
        theme="dracula"
        onChange={this.onChange}
      />
      {
        this.state.compiled
        ? isCompiledCodeTooLarge(this.state.compiled)
        ? ''
        : <pre style={style.compiled}>{this.state.compiled}</pre>
        : ''
      }
      {this.state.error
        ? <pre style={style.error}>{this.state.error.message}</pre>
        : <pre style={style.output}>&gt; {this.state.output}</pre>
      }
    </div>
  }

});

export default Repl;
