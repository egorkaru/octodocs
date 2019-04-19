import { config } from './../config';
import { ParcelBundle } from 'parcel-bundler';
import * as path from 'path'

type Assets =
  {
    css: string
    js: string
  }

const getAssets = (bundle: ParcelBundle): Assets => {
  const jsBundle = [...bundle.entryAsset.bundles].filter(bundle => bundle.type === 'js')[0]
  const js = path.basename(jsBundle.name)
  const cssBundle = [...jsBundle.siblingBundles].filter(bundle => bundle.type === 'css')[0]
  const css = path.basename(cssBundle.name)
  return { js, css }
}

const realPathOnServer = (asset: string): string => `/static/client/${asset}`

export const getHTML = (bundle?: ParcelBundle) => {
  const assets = bundle
    ? getAssets(bundle)
    : { js: 'bundle.js', css: 'bundle.css' }
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name='viewport' content='initial-scale=1.0, width=device-width'>
    <title>${config.title}</title>
    <link rel="stylesheet" href="${realPathOnServer(assets.css)}">
    <script src="script.js"></script>
    <script>
      window.__bundle = ${bundle}
    </script>
  </head>
  <body>
    <div id="${config.react.containerId}"><div>
    <script src="${realPathOnServer(assets.js)}"></script>
  </body>
</html>
` }
