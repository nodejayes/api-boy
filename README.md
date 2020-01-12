Project is under Construction do not use it in Production !!!!!

### Development

* create a index.js file in the Root folder to start the Server

```javascript
const api = require('./src/index');

api({
    endpoint: {
        server: {
            address: 'localhost',
            port: 8080,
            webroot: 'public',
        }
    },
    store: {
        host: 'localhost',
        port: 25432,
        dbname: 'api_boy',
        user: 'username',
        password: '*****',
    },
});
```
