Source Map Peek
===============

[![Greenkeeper badge](https://badges.greenkeeper.io/epeli/source-map-peek.svg)](https://greenkeeper.io/)

Peek into original source via source maps from the command line when devtools fail.

There are still few cases where source map support fails and you have to debug the huge js bundle.

For example

  - Those shitty old browsers
  - Long stack traces from promise libraries such as Q or Bluebird
  - Some bad test frameworks
  - Probably in some other weird setups too

Source Map Peek is a small bandage for these situations. It allows you to view and access the original source using source maps from the command line.

Screencast <http://youtu.be/u11QzPGIDWU>

Usage
-----


    source-map-peek [OPTIONS] FILE<:LINE>[:COLUMN]

    --path      Print only the source path.
    --padding   Add padding for the preview. Default: 10
    --map       Set custom path to the source map file if everything else fails

    To start editor on the line use

    --emacs
    --gedit
    --less
    --nano
    --vim

Example

    $ source-map-peek -p 5 bundle.js:9134
    16:     constructor: ->
    17:         super
    18:         @randomizeIndex()
    19:
    20:         if not @collection
    21:             throw new Error "Collection missing"
    22:
    23:         @listenTo @collection, "reset", => @render()
    24:
    25:         @on "reset", =>

    file /path/to/file.coffee
    line: 20 column: 8

Install
-------

    npm install -g source-map-peek
