const express = require('express')
const { generateImage } = require('./services/canvas.js')
const { uploadFile } = require('./services/s3')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const generateCoupon = async (req, res, next) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            error.statusCode = 400
            next(error)
        }
        const body = req.body
        const base = await generateImage(body)
        const result = await uploadFile(base, body.id)
        res.status(201).send(result)

    } catch (error) {
        if (error.message == 'Server responded with 403') {
            error.statusCode = 404
            error.message = 'Imagem não encontrada, verifique o link'
            next(error)
        }
    }
}

//Rotas
app.post('/coupons/create-image/',
    check('id').notEmpty().withMessage('id não pode ser vazio'),
    check('sellerName').notEmpty().withMessage('sellerName não pode ser vazio'),
    check('code').notEmpty().withMessage('code não pode ser vazio'),
    check('discount').notEmpty().withMessage('discount não pode ser vazio'),
    check('title').notEmpty().withMessage('title não pode ser vazio'),
    check('sellerLogo').notEmpty().withMessage('sellerLogo não pode ser vazio'),
    generateCoupon)

//Not Found Route
app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada')
    erro.statusCode = 404
    next(erro)
})

//Midleware de tratamento de erro
app.use((error, req, res, next) => {
    if (error) {
        res.status(error.statusCode || 500).json({
            statusCode: res.statusCode,
            message: error.message || error.errors
        })
    }
})


app.listen(port)