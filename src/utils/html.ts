import { config } from './../config';
const html = (bundle: {}) =>
`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${config.title}</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
  </head>
  <body>
    <div id="${config.react.containerId}"><div>
  </body>
</html>
`
