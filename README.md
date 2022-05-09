# API de criação de imagens

Endpoint request:

Objeto para requisição:

```json
{
	"id": "5f8b1ce655189f0008ae7c4c",
	"sellerName": "Loja",
	"code": "1P45FGD00054",
	"discount": "16% OFF",
	"title": "Compre eletrodomésticos com 16% de economia",
	"sellerLogo": "https://..."
}
```

- [x] 1 EndPoint;
- [x] Ter uma pasta com várias imagens em branco (template). Escolher uma das imagens de forma aleatória para adicionar o conteúdo;
- [x] Se for hospedar esses template outro que não seja no servidor. Podemos deixar hardcoded as urls;
- [x] Hospedar imagem gerada Upload para S3 via SDK;
- [x] URL da nova imagem;

Recursos:

- Manipulação de imagens no nodejs;
- AWS Lambda (serverless framework);
- Express JS (heroku);

ToDoList:

- [x] Ajustar para que ele receba um método post com credênciais para executar o processo de tratamento da imagem;
- [x] configurar busca por templates de cupom;
- [x] ajustar canvas para o cupom;
- [x] redirecionar imagem tratada para o S3 via SDK;
- [x] retornar requisição com o 'response' contendo o link da imagem gerada;
- [ ] refatorar estrutura de código para manutenções futuras;
