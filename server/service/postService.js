let postController = require('../controller/postController');

console.log("Module postService loaded");

const { Pool, Client } = require( 'pg' );

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});


exports.savePost = async (post) => {
    console.log("reached savepost");
    const query = "INSERT INTO posts (id, user_id, title, climb_name, grade, body) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;";
    const values = [post.id, post.userId, post.title, post.climbName, post.grade, post.body];
    console.log(values);
    try {
        const res = await pool.query(query, values);
        console.log(res.rows[0]);
        return res.rows[0];
    } catch (err) {
        console.error('Error saving post:', err.stack);
        throw new Error('Error saving post to the database');
    }
};

exports.getAllPosts = async () => {
    const query = "SELECT * FROM posts;";
    try {
        const res = await pool.query(query);
        return res.rows.map(post => new Post(post.id, post.user_id, post.title, post.climb_name, post.grade, post.body));
    } catch (err) {
        console.error('Failed to retrieve posts:', err);
        throw new Error('Error retrieving posts from the database');
    }
};
