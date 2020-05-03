const HTMLLexer = require('./lexer');

const input = `<html>
    <head>
        <title>cool</title>
    </head>
    <body class="foo bar">
        <img src="a" />
        <input disabled type="text" />
        hello world
    </body>
</html>`;

const parser = new HTMLLexer(input);

const rawToken = parser.run();
const result = [];
for (let i = 0; i < rawToken.length; i++) {
    rawToken[i] = rawToken[i].replace(/[\n]/g, '');
    rawToken[i] = rawToken[i].trim();
    if (rawToken[i]) {
        result.push(rawToken[i]);
    }
}
console.log(result);
