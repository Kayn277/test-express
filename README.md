## Quick Start

```
git clone 
docker compose up -d
```

Routes
/api/auth/signin [POST]
/api/auth/signin/new_token [POST]
/api/auth/signup [POST]
/api/auth/logout [GET] stricted withUserAuth

/api/file/upload [POST] tricted withUserAuth
/api/file/list?list_size=10&page=1 (optional queries) [GET] stricted withUserAuth
/api/file/delete/:id [DELETE] tricted withUserAuth
/api/file/:id [GET] tricted withUserAuth
/api/file/download/:id [GET] stricted withUserAuth
/api/file/update/:id [PUT] stricted withUserAuth

/api/user/info [GET] stricted withUserAuth
