Simple Special Relativity Converter
====== ======= ========== =========

This is a simple converter that converts between two frames in special
relativity. It consists of several individual coverters. Each converter
handles one point.

In each converter, you give any two of: x, t, x', t', where x and t are
position and time of an event in frame 1, and x' and t' are position and
time of the same event in frame 2.

For example, if you give it x = 5, t = 10, it will tell you what position
and time that an observer in frame 2 will see an event that an observer in
frame 1 sees at (5, 10).

Probably more interesting is when you give it partial input from both
frames, such as x = 5, x' = 8. That would fill in t and t', showing
you where/when an event would have to occur for it to appear at x = 5
in frame 1 and x' = 8 in frame 2.

At any given time, two of the x, t, x', t' fields in a converter are
inputs, and two are outputs. The two inputs are labeled 1 and 2, and
are highlighted, and are editable. The two outputs are grey and not
editable. To change an output to an input, click the little circle
to its left. That will change it to input #1, change the prior input
#1 to #2, and change the prior #2 to an output.

There are two settings given at the top: the velocity difference
between the frames (as a fraction of the speed of light) and a scale.
The scale is simply a multiplier applied to x and x', so you can use
small integers for lengths and still get time differences that are
not ridiculously small.

Here's an example of how you might use this. Let's say you want to work
through the barn door ladder paradox. In that paradox you have a fire
truck with a long ladder on top that sticks out in front and in back.
The length of the ladder is 1.

The truck is approaching a barn of length 1, with closed doors in front
and back, from the front.

As soon as the front of the ladder reaches the barn, the front door opens.
As soon as the back of the ladder reaches the barn, the front door closes.

As soon as the front of the ladder of the ladder reaches the back door,
the back door opens. As soon as the back of the ladder clears the back
door the back door closes.

The paradox is that from the barn's frame, the ladder is Lorentz contracted
to less than length 1, and so the above sequence of door operations is fine
When the back of the ladder clears the front door, and it closes, the back
door is not yet open, and the truck and ladder are entirely in the closed
barn.

But wait! From the truck's frame, it is the barn that is contracted. If the
back door does not open before the front door closes it is going to hit
the truck!

To explore this in the converter, put the front of the ladder at x=1 and the
back at x=0 in the truck frame, and put the front and back barn doors at
x' = 0 and x' = 1 in the barn frame.

Then you have four interesting events:

1. Front of ladder reaches front of barn: x = 1, x' = 0.

2. Front of ladder reachers back of barn: x = 1, x' = 1.

3. Back of ladder reaches front of barn: x = 0, x' = 0.

4. Back of ladder reaches back of barn: x = 0, x' = 1.

If you enter those points in 4 of the converters, and then look at
the t and t' values to see what order the events occur in, you will
find that in the ladder's frame, they occure in 1, 2, 3, 4 order,
and in the barn's frame, they occur in 1, 3, 2, 4 order. In the barn
frame, the front door closes before the back door open, and in the
ladder frame, the front door closes after the back door opens.

Note: each converter has a note field, useful for reminding yourself
what event you are using that converter with.

Now you can go to the converter for 2 (front ladder reaches back of
barn), and change it from an x, x' -> t, t' converter to an x, t'
-> t, x' converter, by clicking next to the inputs until x and t'
are active. They will keep their current values. Change x from 1
(the front of the ladder) to 0 (the back of the ladder) and look
at x'. This tells you where the back of the back of the ladder is
in the barn's frame when it is time for the back door to open. You
will see that it is somewhere between 0 and 1, so in the barn's
frame the ladder is indeed entirely within the barn with both
doors closed.

NOTE: I started this partly to have something reasonably interesting
to try things on after reading an introduction to CSS, and also something
to experiment with JavaScript on. Other things came up and I never really
got a chance to do more than the basic version here. I'm releasing this
as is, even though it is rather primitive, because it is even in this state
useful for simple special relativity problems.
