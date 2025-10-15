export const createTables = {
    create: `DROP TABLE IF EXISTS tasks CASCADE;
            DROP TABLE IF EXISTS boards CASCADE; 
            DROP TABLE IF EXISTS users CASCADE;
            
            CREATE TABLE users(
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE boards(
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                columns TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE tasks(
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                order_position INTEGER DEFAULT 0,
                description TEXT,
                userId UUID REFERENCES users(id) ON DELETE Set null,
                boardId UUID REFERENCES boards(id) ON DELETE CASCADE,
                columnId VARCHAR(60),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`
}
export const boardQueries = {
    getAll: 'SELECT * FROM boards ORDER BY created_at DESC;',
    getID: 'SELECT * FROM boards WHERE id=$1',
    insert: "INSERT INTO boards(title,columns) VALUES($1,$2) RETURNING *",
    update: "UPDATE boards SET title=$1, columns=$2 WHERE id=$3 RETURNING *",
    deleteboard: "DELETE FROM boards WHERE id=$1 RETURNING *"
}
export const queryTask = {
    getAll: "SELECT * FROM tasks ORDER BY created_at DESC;",
    getId: "SELECT * FROM tasks WHERE id=$1;",
    insert: "INSERT INTO tasks(title,order_position,description,userId,boardId,columnId) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    update: "UPDATE tasks SET title=$1, order_position=$2, description=$3, userId=$4, boardId=$5, columnId=$6 WHERE id=$7 RETURNING *",
    deletetask: "DELETE FROM tasks WHERE id=$1 RETURNING *"
}
export const userquery = {
    getAll: 'SELECT * FROM users ORDER BY created_at DESC;',
    insert: 'INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *',
    getId: "SELECT * FROM users WHERE id=$1",
    update: "UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4 RETURNING *",
    deleteuser: "DELETE FROM users WHERE id=$1 RETURNING *"
}
