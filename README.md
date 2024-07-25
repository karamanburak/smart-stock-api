# smart-stock-api

### ERD:

![ERD](./erdStockAPI.png)

### Folder/File Structure:

```
📦src
┣ 📂configs
┃ ┣ 📜dbConnection.js
┃ ┗ 📜swagger.json
┣ 📂controllers
┃ ┣ 📜auth.js
┃ ┣ 📜brand.js
┃ ┣ 📜category.js
┃ ┣ 📜 firm.js
┃ ┣ 📜product.js
┃ ┣ 📜purchase.js
┃ ┣ 📜sale.js
┃ ┣ 📜token.js
┃ ┗ 📜user.js
 ┣ 📂errors
 ┃ ┗ 📜customError.js
 ┣ 📂helpers
 ┃ ┣ 📜passwordEncrypt.js
 ┃ ┣ 📜sendMail.js
 ┃ ┗ 📜sync.js
 ┣ 📂middlewares
 ┃ ┣ 📜authentication.js
 ┃ ┣ 📜errorHandler.js
 ┃ ┣ 📜findSearchSortPage.js
 ┃ ┣ 📜logger.js
 ┃ ┣ 📜permissions.js
 ┃ ┗ 📜upload.js
 ┣ 📂models
 ┃ ┣ 📜brand.js
 ┃ ┣ 📜category.js
 ┃ ┣ 📜firm.js
 ┃ ┣ 📜product.js
 ┃ ┣ 📜purchase.js
 ┃ ┣ 📜sale.js
 ┃ ┣ 📜token.js
 ┃ ┗ 📜user.js
 ┗ 📂routes
 ┃ ┣ 📜auth.js
 ┃ ┣ 📜brand.js
 ┃ ┣ 📜category.js
 ┃ ┣ 📜documents.js
 ┃ ┣ 📜firm.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜product.js
 ┃ ┣ 📜purchase.js
 ┃ ┣ 📜sale.js
 ┃ ┣ 📜token.js
 ┃ ┗ 📜user.js
 ┃ 📂uploads
 ┃ 📂logs
 ┣ 📜.env-sample
 ┣ 📜.gitignore
 ┣ 📜flightApiERD.png
 ┣ 📜index.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜swaggerAutogen.js

```

## Documentation

- [View Postman Documentation](https://documenter.getpostman.com/view/32987022/2sA3kXEfvF)
