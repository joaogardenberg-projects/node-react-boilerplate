const path = require('path')
const fs = require('fs')
const { spawnSync } = require('child_process')

const localesDir = path.join(__dirname, '..', 'locales')
const objectsDir = path.join(__dirname, '..', 'objects')

fs.readdir(localesDir, (err, files) => {
  if (err) {
    return console.log(`Unable to find directory: ${localesDir}`)
  }

  spawnSync('rm', ['-rf', objectsDir], { shell: true })
  spawnSync('mkdir', [objectsDir], { shell: true })

  files
    .filter((file) => file.endsWith('.po'))
    .forEach((file) => {
      const { stdout } = spawnSync(
        'ttag',
        ['po2json', `${localesDir}/${file}`],
        { shell: true }
      )

      fs.writeFileSync(`${objectsDir}/${file}.json`, stdout)
    })
})
