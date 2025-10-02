## Quick Start

```
git clone
docker compose up -d
```

Routes

- `/api/auth/signin` [POST]
- `/api/auth/signin/new_token` [POST]
- `/api/auth/signup` [POST]
- `/api/auth/logout` [GET] - restricted withUserAuth

- `/api/file/upload` [POST] - restricted withUserAuth
- `/api/file/list?list_size=10&page=1` [GET] - optional queries, restricted withUserAuth
- `/api/file/delete/:id` [DELETE] - restricted withUserAuth
- `/api/file/:id` [GET] - restricted withUserAuth
- `/api/file/download/:id` [GET] - restricted withUserAuth
- `/api/file/update/:id` [PUT] - restricted withUserAuth

- `/api/user/info` [GET] - restricted withUserAuth
