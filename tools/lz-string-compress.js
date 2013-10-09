var vm = require('vm'),
    fs = require('fs');

try {
    var script = vm.createScript(fs.readFileSync('../public/res/bower-libs/lz-string/libs/lz-string-1.3.3.js'));
    script.runInThisContext();
    var inputFilePath = process.argv[2];
    console.log('Reading file: ' + inputFilePath);
    var data = '' + fs.readFileSync(inputFilePath);
    console.log('Compressing...');
    var result = LZString.compressToUTF16(data);
    console.log('Size before: ' + data.length);
    console.log('Size after: ' + result.length);
    var outputFilePath = inputFilePath + '.lz';
    console.log('Writing file: ' + outputFilePath);
    fs.writeFileSync(outputFilePath, result);
}
catch (e) {
    console.log('!!! ERROR !!!');
    console.log('_____________');
    console.error(e);
    console.log('\nUsage:  node lz-string-compress filepath\n')
}
