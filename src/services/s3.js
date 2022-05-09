require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')

const BUCKETNAME = process.env.AWS_BUCKET_NAME
const REGION = process.env.AWS_BUCKET_REGION
const ACCESSKEYID = process.env.AWS_ACCESS_KEY
const SECRETACCESSKEY = process.env.AWS_SECRET_KEY
const BUCKETDIRECTORY = process.env.AWS_BUCKET_DIRECTORY


const s3 = new S3({
    region: REGION,
    accessKeyId: ACCESSKEYID,
    secretAccessKey: SECRETACCESSKEY
})

//Upload da imagem
function uploadFile(base, fileName) {
    const buffer = Buffer.from(
        base.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
    )
    //Parametros de upload do conteúdo
    const uploadParams = {
        Bucket: BUCKETNAME,
        Key: BUCKETDIRECTORY + fileName + ".png",
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/png',
    }
    return s3.upload(uploadParams).promise()
}

module.exports = { uploadFile }