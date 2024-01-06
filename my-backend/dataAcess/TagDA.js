import Tag from '../entities/Tag.js';

async function getTags() {
    return await Tag.findAll({include: ["Notes"]});
}

async function getTagById(id) {
    return await Tag.findByPk(id,{include: ["Notes"]});
}
async function deleteTag(id) {
    let tag = await Tag.findByPk(id);
    return await tag.destroy();
}
async function createTag(tag) {
    return await Tag.create(tag);
}
export{
    getTags,
    getTagById,
    deleteTag,
    createTag
};