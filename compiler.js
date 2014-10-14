var traceur = Npm.require('traceur');
var os = Npm.require('os');

Plugin.registerSourceHandler("next.js", function (compileStep) {
    var isBundling = (process.argv[2] === 'bundle');
    var oldPath = compileStep.inputPath;
    var newPath = oldPath.replace(/\.next\.js$/, '.js');
    var moduleName = oldPath.replace(/\.next\.js$/, '');

    var content = compileStep.read().toString('utf8');
    var traceurOptions = {
        arrayComprehension: true,
        generatorComprehension: true,
//    filename: oldPath,
        sourceMaps: true,
//    modules: 'instantiate',
//    moduleName: moduleName,
        types: true,
//    typeAssertions: !isBundling,
        annotations: true
    };
    var output;

    try {
        output = traceur.compile(content, traceurOptions);
    } catch (ex) {
        compileStep.error({
            message: ex.toString().replace(/(\<compile-source\>)/g, "\n$1")
        });
    }

    compileStep.addJavaScript({
        sourcePath: oldPath,
        path: newPath,
        data: output,
        sourceMap: output.sourceMaps
    });

});
