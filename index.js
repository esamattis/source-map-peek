#!/usr/bin/env node

var fs = require("fs");
var SourceMapConsumer = require("source-map").SourceMapConsumer;
var convert = require("convert-source-map");
var kexec = require("kexec");

require("colors");

var argv = require('minimist')(process.argv.slice(2), {
    default: {
        padding: 10
    },
    alias: {
        p: "padding",
        h: "help"
    },
    boolean: [
        "help",
        "vim",
        "emacs",
        "nano",
        "less",
        "gedit",
        "path"
    ]
});

if (argv.help) {
    process.stdout.write(fs.readFileSync(__dirname + "/README.md"));
    process.exit(0);
}

var line = 0;
var column = 0;

// remove file:// prefix if any
var file = argv._[0].replace(/^file\:\/\//, "");

var match;
if (match = file.match(/^(.*?)(\:[0-9]+)(\:[0-9]+|$)/)) {
    file = match[1];
    line = parseInt(match[2].slice(1), 10);
    if (match[3]) column = parseInt(match[3].slice(1), 10);
}

var source = fs.readFileSync(file).toString();

var converter = convert.fromSource(source);

if (!converter.sourcemap) {
    console.error("Cannot find source map from", file);
    process.exit(1);
}

var smc = new SourceMapConsumer(converter.sourcemap);

var origpos = smc.originalPositionFor({ line: line, column: column });

if (argv.vim) {
    kexec("vim", [
        "+call cursor(" + origpos.line + ", " + origpos.column +")",
        origpos.source
    ]);
}

function startEditorOnLine(editor) {
    // Used by the most editors
    kexec(editor, [ "+" + origpos.line, origpos.source ]);
}

if (argv.emacs) startEditorOnLine("emacs");
if (argv.gedit) startEditorOnLine("gedit");
if (argv.less) startEditorOnLine("less");
if (argv.nano) startEditorOnLine("nano");

if (argv.path) {
    process.stdout.write(origpos.source + "\n");
    process.exit(0);
}

var preview = fs.readFileSync(origpos.source)
    .toString()
    .split("\n")
    .map(function(line, i) {
        var linenum = i + 1;
        var out = linenum + ": " + line;
        if (linenum == origpos.line) out = out.red;
        return out;
    })
    .slice(origpos.line - argv.padding, origpos.line + argv.padding)
    .join("\n")
    ;

console.log(preview);
console.log();
console.log("file", origpos.source);
console.log("line:", origpos.line, "column:", origpos.column);
