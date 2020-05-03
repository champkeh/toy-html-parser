# toy-html-parser
学习如何把html代码解析为dom树而自制的解析器

### 测试代码
```js
const input = `<html maaa=a       mbbb="b c">
    <head>
        <title>cool</title>
    </head>
    <body>
        <img src="a" />
    </body>
</html>`;

const parser = new HTMLLexer(input);
const rawToken = parser.run();

// 过滤掉空白无意义token
const result = [];
for (let i = 0; i < rawToken.length; i++) {
    rawToken[i] = rawToken[i].replace(/[\n]/g, '');
    rawToken[i] = rawToken[i].trim();
    if (rawToken[i]) {
        result.push(rawToken[i]);
    }
}
console.log(result);
```

### 结果
```js
[ '<html',
  'maaa=a',
  'mbbb="b c"',
  '>',
  '<head>',
  '<title>',
  'cool',
  '</title>',
  '</head>',
  '<body>',
  '<img',
  'src="a"',
  '/>',
  '</body>',
  '</html>' ]
```
