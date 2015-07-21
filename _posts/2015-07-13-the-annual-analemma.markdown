---
layout: post
title: The Annual Analemma
date: 2015-07-13 20:41:54 -0700
categories: SVG
post_js:
- element/analemma
- post/post2
- download
---

The what?

> analemma (n.) - <br>1. a scale shaped like the figure 8, showing the declination of the sun and the equation of time for each day of the year.<br>- [dictionary.com][dictionary]

Oh, so helpful!  (troll)

Okay, maybe not that helpful––the analemma can be used to describe the path any celstial body traces through its orbital period, not just the sun.  And it isn't always a figure 8 depending on your latitude, the time of day at which you choose to measure, and which body you're tracking.

But mostly, analemmas refer to the sun.  Like this one!

<div class='analemma-container'></div>
<br>
Since I'm normalizing the altitude and azimuth axes to a fixed proportion, they don't really deviate much year-to-year.  But it's a fun way to represent an annual timeline for chronological  data.

Is it more apparent than a straight line?  No.  But it's a lot less boring :D  January 1 is somewhere on the bottom left, I thought of labeling it, but that seems like it would conflict with the metaphor of continuity you get with the Möbian curve of the analemma.

If you check out the [Timeline Of Contents][toc], you'll see what I mean.  Since each point along the analemma corresponds to an amount of time traversed since New Year's Day, you can map an event to the line!


For a much more informed reading, check out <a href='javascript:void(0)' onclick='window.download("tsy.pdf")'>this guy</a>.

For a less informed application, check out the [git repo][git] I set up for the Timeline of Contents widget.  It's not self-executing, but it should operate in a pretty stand-alone fashion from any other front-end things you have going on.

[dictionary]: http://dictionary.reference.com/browse/analemma
[toc]: /toc
[git]: holdonIhaventmadeityet
