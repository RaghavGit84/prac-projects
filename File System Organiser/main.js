#!/usr/bin/env node
let fs = require("fs");
//var fs = require('fs');
//const fs = require('fs');
let path = require("path");

let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");

let inputArr = process.argv.slice(2);
let command = inputArr[0];
let dirPath = inputArr[1];

let types = {
    media: ["mp4", "mkv"],
    archive: ["zip", "rar", "tar"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "txt"],
    app: ["exe", "pkg", "deb"]
}

switch (command) {

    case 'tree':
        treeObj.treeKey(inputArr[1]);
        break;

    case 'organize':
        organizeObj.organizeKey(dirPath);
        break;

    case 'help':
        helpObj.helpKey();
        break;

    default:
        console.log("Please ❌ enter a valid input");

}





