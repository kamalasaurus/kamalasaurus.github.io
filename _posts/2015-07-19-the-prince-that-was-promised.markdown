---
layout: post
title: The [Callback] That Was Promised
date: 2015-07-19 21:56:23 -0700
categories: ES6
---

Oh GRRM, you are too cruel.

-___-

...as a grisly prelude to what will be a longer series on full-stack ES6 with `babel-node`, `iojs`, `koa`, `jspm`, and `react` (oh my), I've noticed a marked lack of treatment on one of the new features in Javascript/ES6/ES2015/whatever they call it:  `Promises`.

`Promises` are terrible.  `Promises` are great!  `Promises`... honestly seem like an interim feature to help interface legacy ES5 patterns with ES6's new generator `*functions` and eventually ES7's `async/await` functions.

That was quite a mouthful!  Generators and `async/await` are both implementations of the yieldable pattern.  As a brief example:

{% highlight javascript %}
function* makeSandwich() {
  var lunchmeat = yield mongo.findSalami();
  var cheese = yield mongo.findCheeses();
  var sandwich = yield assembleSandwich(lunchmeat, cheese);
  eatSandwich(sandwich);
}
{% endhighlight %}

See that `yield` keyword in the function body?  And the `*` adjacent to the function declaration?  The `*` signifies "generator", which means it can use that `yield` keyword.  It makes sure you don't eat a non-existent sandwich by making the function wait for the return value.

All `yield` means is "come back to this point whenever you're done doing whatever long-duration thing you're supposed to do asynchronously and then continue executing this function body."  Without the magic `yield` you'd have to nest everything into a [pyramid of doom], or, if given the option, run it synchronously––which will block your thread and kill your performance.

Generators are generalized (harhar) for aribitrary code-blocks; in ES7, the expectation will be that asynchronous requests should be handled by C#-style `async/await` functions, ergo:

{% highlight javascript %}
async function makeSandwich() {
  var lunchmeat = await mongo.findSalami();
  var cheese = await mongo.findCheeses();
  var sandwich = await assembleSandwich(lunchmeat, cheese);
  eatSandwich(sandwich);
}
{% endhighlight %}

`async/await` is accessible via `babel-node --stage 1` but that's a discussion for another post!  Note that the magic incantation in an `async` function is `await` not `yield`.

Pretty cool, right?  But what does this have to to with `Promises`?

Why clarifying javascript control-flow, of course!

<div class="media-embed">
<iframe src="//giphy.com/embed/kvx37L7cPg9ig" width="480" height="360" frameBorder="0" style="max-width: 100%" class="giphy-embed" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>

The thing is, how do you use these newer, better ways of managing control flow in your application, like in `koa-router`, when all of the `node-core` modules are still callback-centric?  Callbacks aren't yieldable, ya know?

You gotta wrap it in a `Promise`!  Which is kind of ugly-looking, honestly.  The snippet below can be modified to Promisify any callback you see fit.  The secret sauce is the arguments in the `then` block:

{% highlight javascript %}
import http from 'http';

export function getData(id) {

  var URL = 'http://www.somewhere.com/resource/';

  // dear god promises are ugly... but this is how to convert
  // a typical node callback into a thennable, which can yield
  // to a generator.  NO THANKS TO THE INTERNET T_T
  return new Promise((resolve, reject)=> {
    return http.get(`${URL}${id}`, (resp, err)=> {
      err ? reject(err) : void(0);
      var dat = '';
      resp.on('data', (chunk)=> { dat += chunk; });
      resp.on('end', ()=> { resolve(JSON.parse(dat)); });
    });
  }).then(
    (data)=> { return data; },
    (error)=> {
      console.error(error);
      return {};
  });
}
{% endhighlight %}

Notice how `resolve` is `(data)=> { return data; }`?  `then` defines the arguments for the anonymous function inside the `Promise`. In this case, it will fire once the http response ends, because  `resolve` is called inside the `end` event of the callback.  `then` is also the hook that interfaces with the `yield` and `await` keywords––allowing you to call ES5 apis within all that fancy-schmancy ES6 control-flow hawtness.

The caveat being a `Promise` is only yieldable *IF* you `return` out of all of its accessible branches.  Meaning every block that gets passed through has to `return` control to its callee.  Turtles all the way down.

`Promises`.  Oh yeah.

<div class="media-embed">
<iframe width="420" height="315" src="https://www.youtube.com/embed/rSH3NWks7m4" frameborder="0" allowfullscreen></iframe>
</div> 

[pyramid of doom]: http://callbackhell.com/