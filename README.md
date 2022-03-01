# ReactJS Project

## Folder structure

```
src
|__ api (API for resouce)
|  |__ apiClient.js (axiosClient.js or fetchClient)
|  |__ userApi.js
|  |__ productApi.js
|
|__ app
|  |__ store.js (redux store)
|
|__ constants (API for resouce)
|  |__ common.js
|  |__ storage-key.js
|  |__ index.js (entry point export all constants from .js files)
|
|__ components (shared components between features)
|  |__ Loading
|     |__ index.jsx
|     |__ styles.scss
|
|__ features
|  |__ Auth (for Authentication)
|  |  |__ components (components for Auth)
|  |  |__ pages (pages of Auth)
|  |  |__ index.jsx (entry point for Auth)
|  |  |__ userSlice.js
|  |
|  |__ Product
|     |__ components (components of feature Product)
|     |__ pages (pages of feature Product)
|     |__ index.jsx (entry point of feature Product)

|__ utils (commonly use functions)
|  |__ common.js (common functions)
|  |__ index.js (entry point)
|
|__ App.js
```
