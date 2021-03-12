
import alphanum from './alphanum.js';

$('#a').text([
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
].sort(alphanum).map(s => s || '(empty string)').join("\n"));

$('#b').text([
    'x3', 'xy', 'x', 'x3', 'x2', 'x23',
    '000', '01', '009', '01',
    '2x', '2', '#2x', '#20', '#2',
    '40003', '4000000000002', '0000000000003', '00003', '000034',
    'xyz40003q', 'xyz4000000000002q', 'xyz0000000000003q', 'xyz00003q', 'xyz000034q',
    '00000', '00000000000000000000000', '0', '',
].sort(alphanum).map(s => s || '(empty string)').join("\n"));
























