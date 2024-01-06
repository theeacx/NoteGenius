import express from 'express';
import {getTags,
        getTagById,
        deleteTag,
        createTag} from "../dataAcess/TagDa.js";
let tagRouter = express.Router();
tagRouter.route("/tags").get(async (req, res) => {
    return res.json(await getTags());
});
tagRouter.route("/tag/:id").get(async (req, res) => {
    return res.json(await getTagById(req.params.id));
});
tagRouter.route("/tag/:id").delete(async (req, res) => {
    return res.json(await deleteTag(req.params.id));
});
tagRouter.route("/tag").post(async (req, res) => {
    return res.json(await createTag(req.body));
});
export default tagRouter;