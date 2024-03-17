# Fullstack-frontend (Vuejs)
This is a frontend create by Vuejs for project fullstack-dev-test
## Project setup
```
yarn install
```

### Auth & Token
- Start backend api first
- Call api create user account (api/v1/auth/register), then call api login(api/v1/auth/login) to get access token
- Paste the token from response to VUE_APP_ACCESS_TOKEN in .env.development file 

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
