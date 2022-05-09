
const { registerFont, createCanvas, loadImage } = require('canvas')
const dir = './assets/templates'
const data = require('.' + dir + '/templateConfig.json')

//Gravando as fontes
registerFont('./src/assets/fonts/BebasNeue.otf', { family: 'BebasNeue' })
registerFont('./src/assets/fonts/franklin-gothic-medium.ttf', { family: 'franklin-gothic-medium' })
registerFont('./src/assets/fonts/impact.ttf', { family: 'impact' })
registerFont('./src/assets/fonts/WorkSans.ttf', { family: 'WorkSans' })



const canvas = createCanvas(data.template.width, data.template.height)
const { adjustDescription } = require('./description')
const ctx = canvas.getContext('2d')
const fs = require('fs')

//Verificar quantos templates existem na pasta
const dirImages = () => fs.readdirSync('./src/assets/templates').filter(arquivo => arquivo.includes('TEMPLATE')).length
//Função para carregar informações adequadas da imagem no template
const loadImageInfo = function (width, height, data) {

    //Calculo de proporção da imagem
    while (width < 300) {
        width *= 2
        height *= 2
    }
    return {
        imgWidth: width,
        imgHeight: height,
        logoX: data.logoWidth - (Math.trunc(width / 2)),
        logoY: data.logoHeight,
    }
}


const generateImage = async function (body) {

    //Carrega um número aleatório para busca de template
    const template = Math.trunc(Math.random() * dirImages()) + 1

    //diretório da imagem
    const imagePath = `./src/assets/templates/TEMPLATE${template}.png`

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////RENDERIZAÇÃO DO CUPOM

    //Carregar o template e aplica no escopo final
    await loadImage(
        imagePath
    ).then((image) => {
        ctx.drawImage(image, 0, 0, data.template.width, data.template.height)
    })

    //configuração de texto padrão do canvas
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'


    //DESCRIÇÃO
    const descriptionInfo = adjustDescription(body.title, data.couponContent.couponDescription)
    ctx.font = `${descriptionInfo.size} ${descriptionInfo.font}`
    ctx.fillStyle = descriptionInfo.color
    ctx.fillText(descriptionInfo.text, descriptionInfo.width, descriptionInfo.height, descriptionInfo.maxWidth)

    //Valor de Desconto
    const offValueInfo = data.couponContent.offValue
    ctx.font = `${offValueInfo.size} ${offValueInfo.font}`
    ctx.fillText(body.discount, offValueInfo.width, offValueInfo.height)

    //Descrição loja desconto
    const offDescriptionInfo = data.couponContent.offSellerDescription
    ctx.font = `${offDescriptionInfo.size} ${offDescriptionInfo.font}`
    ctx.fillText(offDescriptionInfo.content + ' ' + (body.sellerName).toUpperCase(), offDescriptionInfo.width, offDescriptionInfo.height)

    //Código de Desconto
    const codeInfo = data.couponContent.code
    ctx.font = `${codeInfo.size} ${codeInfo.font}`
    ctx.fillStyle = codeInfo.color
    ctx.fillText(body.code, codeInfo.width, codeInfo.height, codeInfo.widthLimit)


    //Carregar o logo e aplica no escopo final
    await loadImage(body.sellerLogo).then((image) => {

        //Objeto contendo as informações adequadas para o logo dentro do template
        const imgInfo = loadImageInfo(image.naturalWidth, image.naturalHeight, data.logo)

        //Aplicando ao canvas com as informações de proporção
        ctx.drawImage(
            image,
            imgInfo.logoX,
            imgInfo.logoY,
            imgInfo.imgWidth,
            imgInfo.imgHeight
        )
    })

    //Retorna a imagem em base64
    return canvas.toDataURL('image/png')

    //Retorna imagem em uma tag <img> para visualização
    // return `<img style='width:500px' src='${canvas.toDataURL('image/png')}'>`
}

module.exports = { generateImage }
