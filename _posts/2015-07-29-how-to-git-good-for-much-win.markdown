---
layout: post
title: How to Git Good for Much Win
date: 2015-07-29 12:06:18 -0700
categories: git
---

>There once was a man from New Zealand,<br>
>Who came bearing the fruits of experience,<br>
>Rebase, don't merge!<br>
>Delete, don't comment!<br>
>Branch, don't conflict!<br>
>Squash, when possible,<br>
>Force, only personally,<br>
>But, above all––<br>
>Revert, don't reset.<br>
>–apocryphally paraphrased from [Jacob Mattingley][Jacob Mattingley]

For those of you just starting your start-up odysseys, even those of you with considerable solo programming experience, you might find...  you don't know how to work well with other people :(

It's not that you don't get along day-to-day!  Sure, you get drinks after work and there was that time you taste-tested all the lunch delivery and potentially saved their lives from an undiagnosed shellfish allergy...  it's just that when you try to merge your code together––instead of a sublime union of thought and... thought––you're met with an all too familiar despair:

![despair](/images/git-hell.png)

As the recursive, cthontic screams echo across your screen, you can't help but wonder:  why?

`Git` is an interesting technology.  Initially devised by Linus Torvalds for non-linear workflow management––it is best used for... linear workflow management.  `Git` is powerful enough to where you can dig yourself into, through, and out of a grave of incalculable depth in a free-form, branching, communistic kind of way.  To express it less than delicately:  it was designed to traverse the landscape of ...hell!

<div class="media-embed">
  <iframe src="//giphy.com/embed/kKdgdeuO2M08M" width="480" height="360" frameBorder="0" style="max-width: 100%" class="giphy-embed" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>

But hell is scary!  ...and exhausting.  If given the option, why not make for milder, more accomodating climes?  Somewhere with healthcare and year-round alpine skiing.  Like Switzerland.

<div class="media-embed">
<svg width="600px" height="340px">
  <g>
  <rect fill="white" x="0" y="0" width="600px" height="340px"></rect>
  <circle fill="darkred" cx="300px" cy="170px" r="170px"></circle>
  <circle fill="steelblue" cx="230px" cy="200px" r="40px"></circle>
  <text x="300px" y="150px" fill="red">Git Hell</text>
  <text x="0" y="175px" fill="white">
    <tspan x="200px" dy="1.2em">Git</tspan>
    <tspan x="200px" dy="1.2em">Switzerland</tspan>
  </text>
  </g>
</svg>
</div>

Doesn't that sound nice?  As the diagram shows, the secret is to not use the vast majority of `Git`.  For starters, add this to your `~/.gitconfig` :

<pre>
  [color]
    ui = true

  [format]
    pretty = %C(magenta)%h%Creset %Cgreen[%cr]%Creset (%an) %s
</pre>

Now your `git log` will actually be useful.

Next, but perhaps most importantly <b>never</b> `merge`!  Only `rebase`!  This will ensure your changes are placed on top of all existing changes into your target branch if you use the following flow:

{% highlight bash %}
  #while in feature branch
  git rebase master
  git checkout master
  git rebase <feature-branch>
  git push origin master
{% endhighlight %}

It seems a little circular, but it forces your changes to be applied after all current commits on master.

Another helpful tip: before your rebase master into your feature branch, squash your feature branch down to atomic commits.  That way, you only have to deal with conflicts once:

{% highlight bash %}
  #while in feature branch
  git rebase -i <last commit hash on master>
{% endhighlight %}

In your text editor, change all the `pick`s into `s`s except for the ones you want to exist atomically in name.  An atomic commit is one that you could potentially revert together or `cherry-pick` individually.  You can also reorder commits and squash them into atomic units at this point.

In short, I present the following precepts for the foundation of the state of Git Switzerland:

1. Don't comment code, delete it
2. Don't merge, only rebase
3. Squash feature-branch commits into atomic commits
4. Name-space your feature branches with '/', i.e. `git checkout -b kamalasaurus/feature-branch`; this keeps you from having to compete for branch names with your coworkers
5. Never perform destructive changes to <b>master</b> (force, reset, squash)
6. Delete dead and committed branches immediately

Meaning your `git` existence will be forevermore defined by:

{% highlight bash %}
  git checkout -b <feature-branch>
  #while in feature branch
  git rebase -i <last commit hash on master>
  git rebase master
  git checkout master
  git rebase <feature-branch>
  git push origin master
  git branch -d <feature-branch>
  git push origin :<feature-branch>
{% endhighlight %}

If you or your coworkers stray from the narrow path, I have an unfortunate bit of news to deliver:

You're already in git hell.  You just haven't realized it.

<div class="media-embed">
  <iframe width="420" height="315" src="https://www.youtube.com/embed/bkysjcs5vFU" frameborder="0" allowfullscreen></iframe>
</div>

[Jacob Mattingley]: https://twitter.com/jem_nz
