
const adjustDescription = (text, tmpConf) => {
    let heightConf = tmpConf.height1
    let sizeConf = tmpConf.size1
    let newText = text
    let context

    //Verificar quantas linhas vão ser necessárias para quebra
    if (text.length >= tmpConf.wordWrap.lines2[0] && text.length <= tmpConf.wordWrap.lines2[1]) {
        heightConf = tmpConf.height2
        sizeConf = tmpConf.size2
        newText = text.split(' ')
        context = Math.round(newText.length / 2)
        newText[context - 1] += '\n' + newText[context + 1]
        newText.splice(context + 1, 1)
        newText = newText.join(' ')

    } else if (text.length >= tmpConf.wordWrap.lines3[0]) {
        heightConf = tmpConf.height3
        sizeConf = tmpConf.size3
        newText = text.split(' ')
        context = Math.round(newText.length / 3)
        newText[context] += '\n' + newText[context + 1]
        newText.splice(context + 1, 1)
        newText[context * 2] += '\n' + newText[(context * 2) + 1]
        newText.splice((context * 2) + 1, 1)
        newText = newText.join(' ')
    }


    return {
        text: newText.toUpperCase(),
        width: tmpConf.width,
        height: heightConf,
        size: sizeConf,
        font: tmpConf.font,
        color: tmpConf.color,
        maxWidth: tmpConf.maxWidth,
    }
}

module.exports = { adjustDescription }
