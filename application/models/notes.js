class Note {
    constructor() {
        this.id = id;
        this.body = body;
        this.author_id = author_id;
        this.creation_date = creation_date;
        this.tags_count = tags_count;
    }

    static create(db, body, author_id, date) {
        db.run('INSERT INTO note(body, author_id, creation_date) VALUES ("' + body + '","' + author_id + '","' + date + '")');
    }

    static getAllNotes(db) {
        return db.all('SELECT * FROM note');
    }

    static getPersonalNotes(db, user_id) {
        return db.all('SELECT * FROM note WHERE author_id = ?', user_id);
    }

    static getLastTenNotes(db, user_id) {
        return db.all('SELECT * FROM note WHERE author_id = ? ORDER BY id DESC LIMIT 10', user_id);
    }

    static getNote(db, id) {
        return db.get('SELECT * FROM note WHERE id = ?', id);
    }

    static getNoteAuthor(db, id) {
        return db.get('SELECT author_id FROM note WHERE id = ?', id);
    }

    static update(db, body, id) {
        db.run('UPDATE note SET body ="' + body + '" WHERE id = ?', id);
    }

    static delete(db, id) {
        db.run('DELETE FROM note WHERE id = ?', id);
    }

    static noteState(db, state, id) {
        db.run('UPDATE note_has_user_like SET state ="' + state + '" WHERE note_id = ?', id);
    }

    static getNumberNotesLikes(db, user_id) {
        return db.get('SELECT count(*) FROM (SELECT * FROM note LEFT JOIN note_has_user_like ' +
            'ON note.id = note_has_user_like.note_id WHERE note.author_id = ? AND note_has_user_like.state = 1)', user_id)
    }
}

module.exports = {Note};
