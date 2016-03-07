import {head, match, fromMaybe, pipe, test, find} from 'sanctuary';
import {chain, curry, unary, split, join, map, slice, length, replace} from 'ramda';

//determineIndentation :: String -> Maybe Number
export const determineIndentation = pipe([
  match(/^ +/),
  chain(head),
  chain(map(length))
]);

//unindent :: Number -> String -> String
export const unindent = curry((n, x) =>
  slice(Math.min(n, fromMaybe(0, determineIndentation(x))), Infinity, x)
);

//getIndentationLevel :: [String] -> Number
export const getIndentationLevel = pipe([
  find(test(/[^ \s\n\r]/)),
  chain(determineIndentation),
  fromMaybe(0)
]);

//code :: String -> String
export const code = unary(pipe([
  join(''),
  replace(/^\n+/, ''),
  replace(/ +\n/g, '\n'),
  replace(/\n+$/, ''),
  split('\n'),
  xs => map(unindent(getIndentationLevel(xs)), xs),
  join('\n')
]));
