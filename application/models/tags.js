class Tag {
    constructor() {
        this.id = id;
        this.body = body;
    }

    static create(db, body, note_id) {
        db.run('INSERT INTO tag(body, note_id) VALUES ("' + body + '","' + note_id + '")');
    }

    static getAllTags(db, note_id) {
        return db.all('SELECT * FROM tag WHERE note_id = ?', note_id);
    }

    static getPersonalTags(db, user_id) {
        return db.all('SELECT tag.body FROM note INNER JOIN tag ON note.id = tag.note_id WHERE note.author_id = ?', user_id)
    }

    static update(db, body, id) {
        db.run('UPDATE tag SET body ="' + body + '" WHERE id = ?', id);
    }

    static delete(db, id) {
        db.run('DELETE FROM tag WHERE id = ?', id);
    }
}

module.exports = {Tag};