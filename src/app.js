import React from 'react';
import Repl from './components/repl';
import Deck from './components/deck';
import Card from './components/card';
import {code} from './util/string';
import {RED, ORANGE, YELLOW, GREEN, BLUE, GREY2} from './colors';

export default () =>
  <Deck>

    <Card background={GREY2}>
      <h1>Functional Programming</h1>
    </Card>

    <Card background={GREY2}>
      <h1>Functional Programming</h1>
      <h2>Programming with functions</h2>
    </Card>

    <Card background={GREY2}>
      <h1>The end</h1>
      <h2>Questions?</h2>
    </Card>

    <Card background={RED}>
      <h1>The end</h1>
      <h2>Questions?</h2>
      <h3>Just kidding!</h3>
    </Card>

    <Card background={RED}>
      <h1>Warning</h1>
      <h2>Contains code</h2>
      <h4>Feel free to ask questions</h4>
    </Card>

    <Card background={ORANGE}>
      <h1>Before we start</h1>
      <h2>A quick introduction to ES2015</h2>
      <Repl
        value={code `
          var inc = function inc(x) {
            return x + 1;
          };

          inc(1);
        `}
      />
    </Card>

    <Card background={GREEN}>
      <h1>So what do I <i>mean</i> by functions?</h1>
      <h2>Like static methods, except...</h2>
      <h3>First-class</h3>
      <h3>Pure</h3>
      <h3>Total</h3>
    </Card>

    <Card background={BLUE}>
      <h1>First-class Functions</h1>
      <h2>Functions are things</h2>
      <Repl
        value={code `
          const one = 1

          const inc = x => x + one

          inc(one)
        `}
      />
    </Card>

    <Card background={BLUE}>
      <h1>You may know them as</h1>
      <h2>Closures</h2>
      <h2>Anonymous functions</h2>
      <h2>Lambda's</h2>
      <h3>(Every modern, popular language has them)</h3>
    </Card>

    <Card background={BLUE}>
      <h1>Lambda's are awesome!</h1>
      <h2>Functions can return functions</h2>
      <Repl
        value={code `
          const add = a => b => a + b

          const add5 = add(5)

          add5(15)
        `}
      />
      <h3>(This is currying)</h3>
    </Card>

    <Card background={BLUE}>
      <h1>Lambda's are awesome!</h1>
      <h2>Functions can be passed to functions</h2>
      <Repl
        value={code `
          const isEqualBy = (f, a, b) => f(a) === f(b)

          isEqualBy(Math.abs, -42, +42)
        `}
      />
      <h3>(This is higher order)</h3>
    </Card>

    <Card background={BLUE}>
      <h1>Lambda's are awesome!</h1>
      <h2>You've probably used <code>map()</code> before</h2>
      <h3>Combining curry with higher order</h3>
      <Repl
        value={code `
          const add = a => b => a + b

          const data = [1, 2, 3, 4]

          data.map(add(10))
        `}
      />
    </Card>

    <Card background={BLUE}>
      <h1>Lambda's are awesome!</h1>
      <h2>We can glue functions together</h2>
      <Repl
        value={code `
          const add = a => b => a + b
          const mult = a => b => a * b

          const compose = (f, g) => x => f(g(x))

          const add2mult5 = compose(mult(5), add(2))

          add2mult5(0)
        `}
      />
      <h3>(This is composition)</h3>
    </Card>

    <Card background={BLUE}>
      <h1>Lambda's are awesome!</h1>
      <Repl
        hideCompiled
        value={code `
          const toString = x => x.toString()
          const toUpperCase = x => x.toUpperCase()
          const isString = x => typeof x === 'string'
          const append = x => xs => xs + x

          const compose = f => g => x => f(g(x))
          const ifElse = f => g => h => x => f(x) ? g(x) : h(x)


          const shout = (compose
                          (append('!!!'))
                          (toUpperCase))

          const shoutOrToString = ifElse
                                    (isString)
                                    (shout)
                                    (toString)

          shoutOrToString('hello')
        `}
      />
      <h3>(This is point-free)</h3>
    </Card>

    <Card background={YELLOW}>
      <h1>Pure functions</h1>
      <h2>Do not mutate shared state</h2>
      <h3>Impure:</h3>
      <Repl
        value={code `
          let i = 0
          const inc = x => i += x

          inc(1)
          inc(2)
          inc(3)

          i
        `}
      />
      <h3>Purer:</h3>
      <Repl
        value={code `
          const inc = (() => {
            let i = 0
            return x => i += x
          })()

          inc(1)
          inc(2)
          inc(3)
        `}
      />
      <h3>Purest:</h3>
      <Repl
        value={code `
          const inc = (i, x) => i + x

          inc(inc(inc(0, 1), 2), 3)
        `}
      />
      <h3>Purest but nice:</h3>
      <Repl
        value={code `
          const id = x => x
          const compose = (f, g) => x => f(g(x))
          const pipe = fs => fs.reduce(compose, id)

          const add = a => b => a + b

          const program = pipe([
            add(1),
            add(2),
            add(3)
          ])

          program(0)
        `}
      />
      <h3>(Moving away from OOP)</h3>
    </Card>

    <Card background={GREEN}>
      <h1>Total functions</h1>
      <h2>Are true to their own type signature</h2>
      <pre style={{textAlign: 'left', backgroundColor: GREY2}}>{code `
        class MyClass {
          private Int x = 42;
          public Int divideBy(Int n)
          {
            return this.x / n;
          }
        }

        Int answer = new MyClass().divideBy(0);
      `}</pre>
      <h3>The Int is a lie!</h3>
    </Card>

    <Card background={GREEN}>
      <h1>Total functions</h1>
      <h2>Do not lie</h2>
      <h3>Fix the input:</h3>
      <pre style={{textAlign: 'left', backgroundColor: GREY2}}>{code `
        class MyClass {
          private Int x = 42;
          public Int divideBy(NonZeroInt n)
          {
            return this.x / n;
          }
        }
      `}</pre>
      <h4>(NonZeroInt does not include 0)</h4>
      <h3>Fix the output:</h3>
      <pre style={{textAlign: 'left', backgroundColor: GREY2}}>{code `
        class MyClass {
          private Int x = 42;
          public Maybe<Int> divideBy(Int n)
          {
            if(n == 0){
              return Nothing();
            } else {
              return Just(this.x / n);
            }
          }
        }
      `}</pre>
      <h4>(Nothing and Just both inherit from Maybe)</h4>
    </Card>

    <Card background={ORANGE}>
      <h1>Now that you know the basics</h1>
      <h2>We can talk about</h2>
      <h3>
        Monads, Functors, Combinators, Transformers, Birds, Promises, Futures,
        Eithers, Coyonas, Arity, Natural Transformations, Lambda Calculus,
        Tacos, Isomorphisms, Lenses, Catamorphisms, Transducers, etc.
      </h3>
    </Card>

    <Card background={ORANGE}>
      <h1>Now that you know the basics</h1>
      <h2>We can talk about</h2>
      <h3>
        Monads, Functors, Combinators, Transformers, Birds, Promises, Futures,
        Eithers, Coyonas, Arity, Natural Transformations, Lambda Calculus,
        Tacos, Isomorphisms, Lenses, Catamorphisms, Transducers, etc.
      </h3>
      <h1>But not today!</h1>
    </Card>

    <Card background={GREY2}>
      <h1>Libraries</h1>
      <h3><a href="http://ramdajs.com/">RamdaJS</a> - Alternative to Lodash</h3>
      <h3><a href="http://sanctuary.js.org/">Sanctuary</a> - Hardcore Ramda</h3>
      <h3><a href="https://evilcorp.limited/date-fp/">date-fp</a> - Alternative to MomentJS</h3>
      <h3><a href="https://github.com/Avaq/Fluture">Fluture</a> - Alternative to Promises</h3>
    </Card>

    <Card background={GREY2}>
      <h1>Resources</h1>
      <h2>In order of recommended consumpsion</h2>
      <h3><a href="https://www.youtube.com/watch?v=m3svKOdZijA">Underscore you're doing it wrong</a> - Why to use Ramda</h3>
      <h3><a href="https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84">FunFunFunction</a> - A video series about FP in JS</h3>
      <h3><a href="https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84">Mostly Adequate Guide</a> - Book about FP in JS</h3>
      <h3><a href="https://vimeo.com/user7981506/videos">Monad a Day</a> - Video series about Monads</h3>
      <h3><a href="https://www.youtube.com/watch?v=h_tkIpwbsxY">Classroom Coding</a> - Video series about a practical application of Monads</h3>
    </Card>

    <Card background={GREY2}>
      <h1>Questions?</h1>
      <h3>
        You can look at and play with the slides on: <br />
        <a href="https://avaq.github.io/fp-presentation/build/">
          https://avaq.github.io/fp-presentation/build/
        </a>
      </h3>
      <h3>
        You can look at the source code on: <br />
        <a href="https://github.com/Avaq/fp-presentation">
          https://github.com/Avaq/fp-presentation
        </a>
      </h3>
    </Card>

  </Deck>
