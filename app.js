const express = require('express');
const res = require('express/lib/response');
const app = express();
app.use(express.json());
const { getTopics, getUsers, getArticles, getArticleById, patchArticleById, getCommentsByArticleId, postCommentByArticleId } = require('./controllers/controllers');
const { handleCustomErrors,  handlePSQLErrors, handle500s} = require("./controllers/controller-errors/errors")



app.get("/api/topics", getTopics);
app.get("/api/users", getUsers);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId)
app.patch("/api/articles/:article_id", patchArticleById);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);


app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500s);



app.all('*/', (req, res) => {
    res.status(404).send({ msg: "path not found"})
})


module.exports = app; 