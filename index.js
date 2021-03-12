
import cmpalphanum from './cmpalphanum.js';


// @epascarello https://stackoverflow.com/a/4340339
// for comparison

var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;

function cmpAlphaNum(a, b) {
  var aA = a.replace(reA, "");
  var bA = b.replace(reA, "");
  if (aA === bA) {
    var aN = parseInt(a.replace(reN, ""), 10);
    var bN = parseInt(b.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
}

const sample1 = [
    '1000X Radonius Maximus',
    '10X Radonius',
    '200X Radonius',
    '20X Radonius',
    '20X Radonius Prime',
    '30X Radonius',
    '40X Radonius',
    'Allegia 50 Clasteron',
    'Allegia 500 Clasteron',
    'Allegia 50B Clasteron',
    'Allegia 51 Clasteron',
    'Allegia 6R Clasteron',
    'Alpha 100',
    'Alpha 2',
    'Alpha 200',
    'Alpha 2A',
    'Alpha 2A-8000',
    'Alpha 2A-900',
    'Callisto Morphamax',
    'Callisto Morphamax 500',
    'Callisto Morphamax 5000',
    'Callisto Morphamax 600',
    'Callisto Morphamax 6000 SE',
    'Callisto Morphamax 6000 SE2',
    'Callisto Morphamax 700',
    'Callisto Morphamax 7000',
    'Xiph Xlater 10000',
    'Xiph Xlater 2000',
    'Xiph Xlater 300',
    'Xiph Xlater 40',
    'Xiph Xlater 5',
    'Xiph Xlater 50',
    'Xiph Xlater 500',
    'Xiph Xlater 5000',
    'Xiph Xlater 58',
];

const sample2 = [
    'x3', 'xy', 'x', 'x3', 'x2', 'x23',
    '000', '01', '009', '01',
    '2x', '2', '#2x', '#20', '#2',
    '40003', '4000000000002', '0000000000003', '00003', '000034',
    'xyz40003q', 'xyz4000000000002q', 'xyz0000000000003q', 'xyz00003q', 'xyz000034q',
    '00000', '00000000000000000000000', '0', '',
];


$('#a').text(sample1.sort(cmpalphanum).map(s => s || '(empty string)').join("\n"));
$('#b').text(sample2.sort(cmpalphanum).map(s => s || '(empty string)').join("\n"));

$('#c').text(sample1.sort(cmpAlphaNum).map(s => s || '(empty string)').join("\n"));
$('#d').text(sample2.sort(cmpAlphaNum).map(s => s || '(empty string)').join("\n"));

setTimeout(() => {
    let n = 20000;
    
    let start1 = Date.now();
    for (let i = 0; i < n; i++) {
        sample1.sort(cmpalphanum);
        sample2.sort(cmpalphanum);
    }
    let duration1 = Math.floor((Date.now() - start1) / 10) / 100;
    
    let start2 = Date.now();
    for (let i = 0; i < n; i++) {
        sample1.sort(cmpAlphaNum);
        sample2.sort(cmpAlphaNum);
    }
    let duration2 = Math.floor((Date.now() - start2) / 10) / 100;
    
    
    $('#e').text(`${n} iterations: ${duration1} sec`);
    $('#f').text(`${n} iterations: ${duration2} sec`);
}, 100);






















