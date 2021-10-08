 //test test
(function (_log, _clr, _time, _tend) {
    let max = 50;
    let counter = 0;
    let clean = text => text.replace(/</g, '&lt;');
    let console_log = (...args) => {
        if (args.length === 0) args = [''];
        if (counter++ > max) return;
        if (counter > max) args = ['... truncated ...'];
        let _console = $('#_webedit_console_content');
        if (!_console.length) {
            $('body').append('<div id="_webedit_console" style="position: fixed; z-index: 1; left: 1px; right: 1px; bottom: 1px; max-height: 2in; opacity: 0.5; border: thin dashed gray; overflow-x: auto; padding: 4px;">'
                            + '<button id="_webedit_console_clear" style="position: absolute; top: 0px; right: 3px;">clear</button>'
                            + '<pre id="_webedit_console_content" style="margin: 0;"><b>CONSOLE OUTPUT (except some error messages--see browser console.)</b>\n</pre>'
                            + '</div>');
            _console = $('#_webedit_console_content');
            $('#_webedit_console_clear').click(event => console_clear());
        }
        let output = args[0];
        if (args.length > 1 || args[0][0] !== '<') {
            output = clean(args.map(pretty).join(' '));
            try {
                throw new Error();
            } catch (e) {
                let line = '???';
                try {
                    line = e.stack.split(/\n/)[2].match(/.*\/(.*):\d+\)?/)[1];
                } catch (e) {}
                output = `<span style='float: right; color: red'>${clean(line)}</span>${output}`;
            }

        }
        _console.append(output.replace(/\s*$/, '\n')).parent().scrollTop(_console.height());
        
        function pretty(v) {
            const p = 1e5;
            return typeof v === 'string' ? v
                : typeof v === 'boolean' || typeof v === 'function'? String(v)
                : v === null || v === undefined ? String(v)
                : typeof v === 'number' ? String(Math.round(v * p) / p)
                : v instanceof Error ? v.toString()
                : typeof v === 'object' && v.constructor.name.match(/Array$/) ? '[' + v.map(pretty).join(', ') + ']'
                : Array.isArray(v) ? '[' + v.map(pretty).join(', ') + ']'
                : '{' + Object.getOwnPropertyNames(v)
                    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                    .map(k => `${pretty(k)}: ${pretty(v[k])}`).join(', ') + '}'
                ;
        }
    };
    addEventListener('error', event => {
        event.preventDefault();
        const {message, filename: source, lineno, colno, error} = event;
        console.log(`<span style='float: right; color: red'>${[clean(source.replace(/.*\//, '')), lineno].join(':')}</span>${error}. line ${lineno}, col ${colno}`);
        fetch(source)
        .then(res => res.text())
        .then(text => text.split('\n')[lineno - 1])
        .then(line => {
            if (!line) return '';
            const lhs = line.substr(0, colno - 1);
            const mhs = (line.substr(colno - 1).match(/\w+|./) || [' '])[0];
            const rhs = line.substr(colno - 1 + mhs.length);
            return `<span>${lineno}\t${clean(lhs)}<span style="border: 2px solid red">${clean(mhs)}</span>${clean(rhs)}</span>`;
        })
        .then(console.log);
    });
    let console_clear = () => {
        _clr();
        counter = 0;
        $('#_webedit_console_content').html('');
    };
    console.orig = {log: console.log, clear: console.clear};
    console.log = console_log;
    console.clear = console_clear;
    console.done = () => {
        let console = $('#_webedit_console_content');
        let total = counter;
        counter = 0;
        if (total > max) console_log(`... ${total} lines total ...`);
    };
    let beg = {};
    console.time = (s) => beg[s] = Date.now();
    console.timeEnd = (s) => console_log(`... ${(Date.now() - (beg[s] || Date.now())) / 1000.} sec ...`);
})(console.log, console.clear, console.time, console.timeEnd);