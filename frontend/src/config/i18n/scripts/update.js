const path = require('path')
const fs = require('fs')
const { spawnSync } = require('child_process')

const localesDir = path.join(__dirname, '..', 'locales')

fs.readdir(localesDir, (err, files) => {
  if (err) {
    return console.log(`Unable to find directory: ${localesDir}`)
  }

  files
    .filter((file) => file.endsWith('.po'))
    .forEach((file) => {
      const ls = spawnSync('ttag', ['update', `${localesDir}/${file}`, 'src'])
      console.log(ls.stderr.toString())
    })
})
