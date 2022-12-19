



require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = "learnreactbrocamp"
const region ="ap-northeast-1"
const accessKeyId = "AKIARCUCLJOSBLNLINML"
const secretAccessKey = "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"

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile