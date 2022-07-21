let METADATA_DIRECTORY = './metadata/'
let IMAGES_DIRECTORY = './images/'
let IMAGE_BASE_URL = 'https://ipfs.io'

const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const fileToIpfs = require('@kleros/file-to-ipfs')

async function uploadFileList(files) {
  for (const file of files) {
    console.log(`Uploading ${file.replace('.json', '')}`)
    let file_name = await fileToIpfs(IMAGES_DIRECTORY + file.replace('.json', '') + ".png").catch(console.error)
    let rawdata = fs.readFileSync(METADATA_DIRECTORY + file.replace('.json', '')+'.json')
 
    let metadata_json = JSON.parse(rawdata)
    metadata_json["image"] = IMAGE_BASE_URL + file_name
    fs.writeFileSync(METADATA_DIRECTORY + file.replace('.json', ''), JSON.stringify(metadata_json))
    console.log(`Uploaded to ${IMAGE_BASE_URL + file_name}`)
  }
}

fs.readdir(METADATA_DIRECTORY, (err, files) => uploadFileList(files))