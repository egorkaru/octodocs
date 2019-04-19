import { config } from './../config';
const html = (bundle: {}) =>
`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name='viewport' content='initial-scale=1.0, width=device-width'>
    <title>${config.title}</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
  </head>
  <body>
    <div id="${config.react.containerId}"><div>
  </body>
</html>
`
