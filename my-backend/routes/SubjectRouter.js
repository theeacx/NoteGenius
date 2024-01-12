import express from 'express';
import {getSubjects,
    getSubjectById,
    createSubject,
    deleteSubject,
    getSubjectsByUser} from "../dataAcess/SubjectDA.js";
let subjectRouter = express.Router();    
subjectRouter.route("/subject").post(async (req, res) => {
    return res.status(201).json(await createSubject(req.body));
});
subjectRouter.route("/subjects").get(async (req, res) => {
    return res.json(await getSubjects());
});
subjectRouter.route("/subject/:id").get(async (req, res) => {
    return res.json(await getSubjectById(req.params.id));
});
subjectRouter.route("/subject/:id").delete(async (req, res) => {
    return res.json(await deleteSubject(req.params.id));
});
subjectRouter.route("/subjects/:id").get(async (req, res) => {
    return res.json(await getSubjectsByUser(req.params.id));
});
export default subjectRouter;