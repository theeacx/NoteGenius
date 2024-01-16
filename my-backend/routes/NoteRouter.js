import express from 'express';
import {getNotes,
        getNoteById,
        deleteNote,
        createNote,
        updateNote,
        getNotesWithFilterAndPagination,
        getNotesByUserId,
        getTagsByNoteId,
        updateTagsByNoteId} from "../dataAcess/NoteDA.js";
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

noteRouter.route('/note/noteFilter/:id').get( async (req, res) => {
    return res.json(await getNotesWithFilterAndPagination(req.query));
})

noteRouter.route('/note/noteUser/:id').get( async (req, res) => {
    return res.json(await getNotesByUserId(req.params.id));
})

//route for getting the tags for a note 
noteRouter.route("/note/:id/tags").get(async (req, res) => {
    return res.json(await getTagsByNoteId(req.params.id));
});

//route for updating the tags for a note
noteRouter.route("/note/:id/tags").put(async (req, res) => {
    return res.json(await updateTagsByNoteId(req.params.id, req.body));
});



export default noteRouter;