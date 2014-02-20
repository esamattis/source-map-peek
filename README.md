# source-map-peek

Peek into embedded source maps from the cli when devtools fail.

Usage

    source-map-peek [-p|--padding] FILE<:LINE>[:COLUMN]

    --vim start vim on the line

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

Install `npm install -g source-map-peek`
