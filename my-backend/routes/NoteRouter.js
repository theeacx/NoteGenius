import express from 'express';
import {getNotes,
        getNoteById,
        deleteNote,
        createNote,
        updateNote,
        getNotesWithFilterAndPagination} from "../dataAcess/NoteDA.js";
let noteRouter = express.Router();
noteRouter.route("/note").post(async (req, res) => {
    return res.status(201).json(await createNote(req.body));
});
noteRouter.route("/notes").get(async (req, res) => {
    return res.json(await getNotes());
});
noteRouter.route("/note/:id").get(async (req, res) => {
    return res.json(await getNoteById(req.params.id));
});
noteRouter.route("/note/:id").delete(async (req, res) => {
    return res.json(await deleteNote(req.params.id));
});
noteRouter.route("/note/:id").put(async (req, res) => {
    let ret = await updateNote(req.params.id, req.body);

    if (ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj)
});

noteRouter.route('/noteFilter').get( async (req, res) => {
    return res.json(await getNotesWithFilterAndPagination(req.query));
})
export default noteRouter;