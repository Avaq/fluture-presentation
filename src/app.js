import React from 'react';
import Repl from './components/repl';
import Deck from './components/deck';
import Card from './components/card';
import {code} from './util/string';
import {RED, ORANGE, YELLOW, GREEN, BLUE, GREY2} from './colors';

export default () =>
  <Deck>

    <Card background={GREY2}>
      <h1>Into the Fluture</h1>
    </Card>

    <Card background={BLUE}>
      <h1>A brief history of async</h1>
      <h2>Continuation passing style</h2>
      <h4>(callbacks)</h4>
      <Repl
        value={code `
          function myFunction(a, b){
            return (a + b);
          }

          //continuation:
          log(myFunction(1, 2))
        `}
      />
    </Card>

    <Card background={BLUE}>
      <h1>A brief history of async</h1>
      <h2><a href="https://github.com/caolan/async">Async.js</a></h2>
      <h4>(an abstraction over callbacks)</h4>
    </Card>

    <Card background={BLUE}>
      <h1>A brief history of async</h1>
      <h2><a href="https://api.jquery.com/category/deferred-object/">jQuery Deferred</a></h2>
      <h2><a href="https://github.com/kriskowal/q">Q</a></h2>
      <h4>(better abstractions over callbacks)</h4>
    </Card>

    <Card background={BLUE}>
      <h1>A brief history of async</h1>
      <h2><a href="https://promisesaplus.com/">Promises/A+</a></h2>
      <h4>(a formalization of promises)</h4>
      <Repl
        value={code `
          function myFunction(a, b){
            return Promise.resolve(a + b);
          }

          //continuation:
          myFunction(1, 2).then(log);
        `}
      />
    </Card>

    <Card background={BLUE}>
      <h1>A brief history of async</h1>
      <h2><a href="https://github.com/tj/co">Co</a></h2>
      <h2><a href="https://tc39.github.io/ecmascript-asyncawait/">Async/Await</a></h2>
      <h4>(abstractions over promises)</h4>
    </Card>

    <Card background={YELLOW}>
      <h1>But, Monads!</h1>
      <h2>Meanwhile; mathematicians were doing maths</h2>
      <a href="https://www.youtube.com/watch?v=hoh4TmPzu1w">
        <img src="https://i.ytimg.com/vi/TMPPgAAmZ0M/maxresdefault.jpg" />
      </a>
    </Card>

    <Card background={YELLOW}>
      <h1>But, Monads!</h1>
      <h2>Particularly: Boxes</h2>
      <h4>(containers with a value)</h4>
      <pre>{code `
        Array(value)            //Array is a box
        Just(value)             //Maybe is a box
        Observable.of(value)    //Stream is a box
        Promise.resolve(value)  //Promise is a box
        Future.of(value)        //Future is a box
      `}</pre>
      <h4>...and so are many more useful abstractions we use every day</h4>
    </Card>

    <Card background={YELLOW}>
      <h1>But, Monads!</h1>
      <h2>There's a pattern here!</h2>
      <img src="https://wiki.haskell.org/wikiupload/e/ee/Natural_transformation.png" />
    </Card>

    <Card background={YELLOW}>
      <h1>But, Monads!</h1>
      <h2>
        <a href="https://github.com/promises-aplus/promises-spec/issues/94#issuecomment-16176966">
          So the math people tried to tell the Promise people
        </a>
      </h2>
      <h4>...and failed</h4>
    </Card>

    <Card background={ORANGE}>
      <h1>Fantasy Land</h1>
      <h2>
        <a href="https://github.com/fantasyland/fantasy-land">
          And so the Fantasy Land specification was born
        </a>
      </h2>
      <img src="https://raw.githubusercontent.com/fantasyland/fantasy-land/master/logo.png" />
      <h4>A specification describing the behaviour of boxes in JavaScript</h4>
      <br />
      <img src="https://raw.githubusercontent.com/fantasyland/fantasy-land/master/figures/dependencies.png" />
    </Card>

    <Card background={GREEN}>
      <h1>Fluture</h1>
      <h2>FL + Future = Fluture</h2>
      <Repl
        value={code `
          const add1 = x => x + 1;

          let arr = [1];
          let fut = Future.of(1);

          arr = arr.map(add1);
          fut = fut.map(add1);

          log(arr[0]);
          fut.value(log);
        `}
      />
    </Card>

    <Card background={GREEN}>
      <h1>Fluture</h1>
      <h2>Compared to Promises</h2>
      <Repl
        value={code `
          //Promises are "eager" (immediately interpreted)
          const p = new Promise((res, rej) => {
            log('hello Promise');
            res(1);
          })

          //Futures are "lazy" (if nobody needs them, they won't even run)
          const f = Future((rej, res) => {
            log('hello Future');
            res(1);
          })
        `}
      />
    </Card>

    <Card background={GREEN}>
      <h1>Fluture</h1>
      <h2>Compared to Promises</h2>
      <Repl
        value={code `
          //Promises are "magical" (they make their own decisions)
          const continuationP = _ => "Hello world"
          const p = Promise.resolve(1).then(continuationP).then(log)

          //Futures are "logical" (every function always does the same thing)
          const continuationF = _ => "Hello world"
          const f = Future.of(1).map(continuationP).value(log)
        `}
      />
    </Card>

    <Card background={GREEN}>
      <h1>Fluture</h1>
      <h2>Compared to Promises</h2>
      <Repl
        value={code `
          //Promises always cache (cannot re-execute)
          const p = new Promise((res, rej) => {
            log('hello Promise');
            res(1);
          });

          p.then(noop)
          p.then(noop)

          //Futures don't cache by default (but can be easily made to do so)
          const f = Future((rej, res) => {
            log('hello Future');
            res(1);
          });

          f.value(noop)
          f.value(noop)
        `}
      />
    </Card>

    <Card background={GREEN}>
      <h1>Fluture</h1>
      <h2>Compared to Promises</h2>
      <Repl
        value={code `
          //Promises eat your errors
          const p = new Promise((res, rej) => {
            rej(new Error('ALLES KAPUTT CALL THE POLICE'));
          });

          p.then(log)

          //Futures force you to handle every error
          const f = Future((rej, res) => {
            rej(new Error('ALLES KAPUTT CALL THE POLICE'));
          });

          f.value(log)
        `}
      />
    </Card>

    <Card background={GREEN}>
      <h1>In summary</h1>

      <h3>Promises are made-up. Abstractions have to be made specifically for them</h3>
      <h3>Futures are boxes like any other box. Every abstraction for any box works on Futures as well</h3>

      <h3>Promises are magical. They take "smart" decisions for you, like Microsoft Clippy</h3>
      <h3>Futures are logical. They do what you tell them to do and nothing more</h3>

      <h3>Promises are eager. They execute code even if they don't need to, which is terrible when you are mindful of side-effects</h3>
      <h3>Futures are lazy. They let you decide if and when you execute them</h3>

      <h3>Promises always cache. There is no way to re-execute the operation in the Promise</h3>
      <h3>Futures can cache. They don't cache by default, but it's super easy to add it</h3>
    </Card>

    <Card>
      <h1>I guess that was it</h1>
    </Card>

  </Deck>
