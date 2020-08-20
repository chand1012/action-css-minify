const core = require('@actions/core');
const github = require('@actions/github');
const csso = require('csso');
const path = require('path');
const fs = require('fs');

try {
    const givenDir = core.getInput('folder');

    console.log('Minifying files in ' + givenDir);

    const directoryPath = path.join(givenDir);
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            throw err;
        }

        files.forEach((file) => {
            var filePath = path.join(directoryPath, file)
            if (file.includes('.css') && !file.includes('.min.css')) {
                console.log('Minifying ' + file);
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        throw err;
                    }
    
                    var minifiedCss = csso.minify(data).css;
                    var newName = filePath.replace('.css', '.min.css');
    
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