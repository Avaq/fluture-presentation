import {curry, map} from 'ramda';

//Thrush combinator
//T :: a -> (a -> b) -> b
const T = x => f => f(x);

//create :: {k: a -> b} -> a -> {k: b}
export const create = curry((spec, val) => map(T(val), spec));
