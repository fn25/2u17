

Boshlash:
```bash
npm init -y 
npm i express jsonwebtoken dotenv morgan
npm run dev
```

### kirish
- `POST /setUp` - Create tables

### POST
```json
POST /users
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
POST /board
{
  "title": "My Project",
  "columns": "To Do,In Progress,Done"
}
POST /task
{
  "title":"birgalikda",
"order":345,
"description":"bla bla",
"userId":"8b3dd779-a009-4f19-8fd6-edf379a678db",
"boardId":"afebcff7-1292-46c5-aa33-3f7e4339042d",
"columnId":"bla bla"
}
```


