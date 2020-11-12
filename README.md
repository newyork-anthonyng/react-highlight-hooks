[![Travis build status][travis-badge]][travis-build]
[![Codecov branch][codecov-badge]][codecov]
[![npm][npm-badge]][npm-version]
[![downloads][downloads-badge]][npmcharts]
[![MIT License][license-badge]][license]

[![gzip size][gzip-badge]][unpkg]
[![size][size-badge]][unpkg]

[![Maintainability][code-climate-badge]][code-climate]
[![PRs Welcome][pull-request-badge]](http://makeapullrequest.com)

# react-highlight-hooks
A React hook to highlight words.

Inspired by [react-highlight-words](https://github.com/bvaughn/react-highlight-words)

## Getting started
`npm install --save react-highlight-hooks`

```js
import React from "react";
import { useHighlighter } from "react-highlight-hooks";

function App() {
    const {
        textToSearch,
        setTextToSearch,
        searchTerms,
        setSearchTerms,
        activeIndex,
        setActiveIndex,
        totalHighlights,
        chunks,
    } = useHighlighter({
        textToSearch: "Hello World",
        searchTerms: "hello",
    });

    // ...
}
```

## API
`useHighlighter` is a React hook that returns the following:

| Name | Description | Type |
| --- | --- | --- |
| textToSearch | This is the body of text that you will be highlighting words from | String |
| setTextToSearch | This is a function to update `textToSearch` | Function |
| searchTerms | This is a space-separated list of words that you are searching for in the `textToSearch` | String |
| setSearchTerms | This is a function to update `searchTerms` | Function |
| activeIndex | This is the index of the currently-active highlighted word | Number |
| setActiveIndex | This is a function to update `activeIndex` | Function |
| totalHighlights | This is the number of words highlighted in `textToSearch` | Number |
| [chunks](#chunks) | This is an array of object which describe the matches found | Array |

### Chunks
`chunks` is an array of object which describes the matches found. The objects have the following keys:

| Name | Description | Type |
| --- | --- | --- |
| active | If this item is highlighted and is active, this is true | Boolean
| start | This is the index from the `textToSearch` where this chunk of text begins | Number |
| end | This is the index from the `textToSearch` where this chunk of text ends | Number |
| highlight | If this chunk of text is highlighted, this is true | Boolean |
| text | This is the chunk of text, which can be derived from the `start` and `end` indexes | String |

#### Example chunks
```js
import React from "react";
import { useHighlighter } from "react-highlight-hooks";

function App() {
    const { chunks } = useHighlighter({
        textToSearch: "Hello World",
        searchTerms: "hello",
    });

    console.log(chunks);
    /*
    [
        {
            highlight: true,
            active: true,
            start: 0,
            end: 5,
            text: 'Hello'
        },
        {
            highlight: false,
            active: false,
            start: 5,
            end: 11,
            text: ' world'
        }
    ]
    */
}
```
## Demo
[CodeSandbox](https://codesandbox.io/s/wonderful-chandrasekhar-4y777)

[codecov]: https://codecov.io/gh/newyork-anthonyng/react-highlight-hooks
[codecov-badge]: https://img.shields.io/codecov/c/github/newyork-anthonyng/react-highlight-hooks/master.svg
[code-climate]: https://codeclimate.com/github/newyork-anthonyng/react-highlight-hooks/maintainability
[code-climate-badge]: https://api.codeclimate.com/v1/badges/faefec967ef40a030c3e/maintainability
[downloads-badge]: https://img.shields.io/npm/dm/react-highlight-hooks.svg?style=flat-square
[license]: https://github.com/newyork-anthonyng/react-highlight-hooks/blob/master/LICENSE
[license-badge]: https://img.shields.io/npm/l/react-highlight-hooks.svg?style=flat-square
[npmcharts]: https://npmcharts.com/compare/react-highlight-hooks
[npm-version]:https://www.npmjs.com/package/react-highlight-hooks
[npm-badge]: https://img.shields.io/npm/v/react-highlight-hooks.svg?style=flat-square
[pull-request-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[travis-badge]: https://travis-ci.org/newyork-anthonyng/react-highlight-hooks.svg?branch=master
[travis-build]: https://travis-ci.org/newyork-anthonyng/react-highlight-hooks
[gzip-badge]: http://img.badgesize.io/https://unpkg.com/react-highlight-hooks?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/react-highlight-hooks?label=size&style=flat-square
[unpkg]: https://unpkg.com/react-highlight-hooks
