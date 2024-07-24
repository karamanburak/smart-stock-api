# STOCK MANAGEMENT API

- [smart-stock-api Live Link]()

### ERD:

![ERD](./erdStockAPI.png)

### Folder/File Structure:

```
    .env
    .gitignore
    index.js
    package.json
    readme.md
    src/
        config/
            dbConnection.js
            swagger.json
        controllers/
            auth.js
            brand.js
            category.js
            firm.js
            product.js
            purchase.js
            sale.js
            token.js
            user.js
        helpers/
            passwordEncrypt.js
            sendMail.js
        middlewares/
            authentication.js
            errorHandler.js
            findSearchSortPage.js
            logger.js
            permissions.js
            upload.js
        models/
            brand.js
            category.js
            firm.js
            product.js
            purchase.js
            sale.js
            token.js
            user.js
        routes/
            auth.js
            brand.js
            category.js
            document.js
            firm.js
            index.js
            product.js
            purchase.js
            sale.js
            token.js
            user.js
```

## Documentations

- [View Postman Documentation](https://documenter.getpostman.com/view/32987022/2sA3kXEfvF)
- [View Swagger Documentation]()
- [View Redoc Documentation]()
- [View Json Documentation]()
