# Basic writing

## Styling text

Make text **bold** or *italic* by using either `*` or `_` around the text.

_This text will be italic_
__This text will be bold__

Create strikethrough text by using `~~`.

~~Mistaken text.~~

## Blockquotes

Indicate blockquotes with a `>`.

> Blockquote

## Headings

Create a heading by adding one or more `#` symbols before your heading text.

##### Heading level 5
###### Heading level 6

## Horizontal rules

Insert a horizontal rule by putting three or more `-`, `*`, or `_` on a line by themselves.

----------

## Table of contents

Insert a table of contents using the marker `[TOC]`.

[TOC]


# Lists

## Unordered lists

Make an unordered list by preceding list items with either a `*` or a `-`.

- Item
- Item
* Item

## Ordered lists

Make an ordered list by preceding list items with a number.

1. Item 1
2. Item 2
3. Item 3


# Code formatting

## Inline formats

Use single backticks to format text in a special `monospace format`.

## Multiple lines

Indent four spaces or a tab to format text as its own distinct block.

    var foo = 'bar'; // baz

## Code highlighting

Use triple backticks including the language identifier to have syntax highlighting.

```js
var foo = 'bar'; // baz
```


# Links and images

## Links

Create a link by wrapping link text in brackets, and then wrapping the link in parentheses.

[Visit Classeur](http://classeur.io)

## Images

Images are like links, but have an exclamation point in front of them.

![Classeur Logo](http://classeur.io/images/logo.png)

## Footnotes

To create footnotes, add a label starting with a `^` between a set of square brackets like this[^footnote], and then, declare the linked content.

  [^footnote]: Here is the content of the footnote.


# Tables

Create tables by assembling a list of words and dividing them with hyphens (for the first row), and then separating each column with a pipe.

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

By including colons within the header row, you can define text to be left-aligned, right-aligned, or center-aligned.

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |

