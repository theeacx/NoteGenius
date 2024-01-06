import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import DB_Init from './entities/DBinit.js';
import createDbRouter from './routes/createDbRoute.js';
import userRouter from './routes/UserRouter.js';
import subjectRouter from './routes/SubjectRouter.js';
import tagRouter from './routes/TagRouter.js';
import noteRouter from './routes/NoteRouter.js';
env.config();

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

DB_Init();

app.use("/api", createDbRouter)
app.use("/api", userRouter);
app.use("/api", subjectRouter);
app.use("/api", tagRouter);
app.use("/api", noteRouter);

let port = process.env.PORT || 8001;
app.listen(port);
console.log('API is runnning at ' + port);

