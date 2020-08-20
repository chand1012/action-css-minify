const core = require('@actions/core');
const github = require('@actions/github');
const csso = require('csso');
const path = require('path');
const fs = require('fs');

try {
    const givenDir = core.getInput('folder');
    const directoryPath = path.join(givenDir);
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            throw err;
        }

        files.forEach((file) => {
            if (file.includes('.css') && !file.includes('.min.css')) {
                fs.readFile(file, 'utf8', (err, data) => {
                    if (err) {
                        throw err;
                    }
    
                    var minifiedCss = csso.minify(data).css;
                    var newName = file.replace('.css', '.min.css');
    
                    fs.writeFile(newName, minifiedCss, (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log('Wrote ' + newName + ' to directory.');
                    });
    
                });
            }
        });
    });
} catch (error) {
    core.setFailed(error.message)
}