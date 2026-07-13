import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import { marked } from 'marked'
import puppeteer from 'puppeteer-core'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const manualPath = join(root, 'MANUAL.md')
const pdfPath = join(root, 'MANUAL.pdf')

const browserPaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
]

const executablePath = browserPaths.find((path) => existsSync(path))

if (!executablePath) {
  console.error('No se encontró Chrome ni Edge para generar el PDF.')
  process.exit(1)
}

const markdown = await readFile(manualPath, 'utf8')
const body = marked.parse(markdown)

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Mojitos Miami — Manual de usuario</title>
  <style>
    @page {
      margin: 18mm 16mm 20mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.55;
      color: #1a1a1a;
      max-width: 100%;
    }

    h1 {
      font-size: 24pt;
      margin: 0 0 8pt;
      color: #111;
      page-break-after: avoid;
    }

    h2 {
      font-size: 16pt;
      margin: 22pt 0 8pt;
      padding-top: 4pt;
      color: #111;
      border-bottom: 1px solid #ddd;
      page-break-after: avoid;
    }

    h3 {
      font-size: 13pt;
      margin: 16pt 0 6pt;
      color: #222;
      page-break-after: avoid;
    }

    p, li {
      margin: 0 0 8pt;
    }

    ul, ol {
      margin: 0 0 10pt 18pt;
      padding: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 8pt 0 14pt;
      font-size: 10pt;
      page-break-inside: avoid;
    }

    th, td {
      border: 1px solid #ccc;
      padding: 6pt 8pt;
      text-align: left;
      vertical-align: top;
    }

    th {
      background: #f3f3f3;
      font-weight: 700;
    }

    code {
      font-family: Consolas, "Courier New", monospace;
      font-size: 9.5pt;
      background: #f5f5f5;
      padding: 1pt 4pt;
      border-radius: 3pt;
    }

    pre {
      background: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 6pt;
      padding: 10pt 12pt;
      overflow-wrap: anywhere;
      white-space: pre-wrap;
      font-size: 9.5pt;
      page-break-inside: avoid;
    }

    blockquote {
      margin: 8pt 0 12pt;
      padding: 8pt 12pt;
      border-left: 4pt solid #b7f26a;
      background: #f8fff0;
      color: #333;
    }

    hr {
      border: none;
      border-top: 1px solid #ddd;
      margin: 18pt 0;
    }

    a {
      color: #1a5f2a;
      text-decoration: none;
    }

    strong {
      font-weight: 700;
    }
  </style>
</head>
<body>
${body}
</body>
</html>`

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  })
  console.log(`PDF generado: ${pdfPath}`)
} finally {
  await browser.close()
}
