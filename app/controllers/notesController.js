class NotesController {
    constructor() {
        this.id = id;
        this.body = body;
        this.author_id = author_id;
        this.creation_date = creation_date;
        this.tags_count = tags_count;
    }

    create(db, body, author_id) {
        db.run('INSERT INTO note(body, author_id) VALUES ("' + body + '","' + author_id + '")');
    }

    readAllNotes(db) {
        db.all('SELECT * FROM note');
    }

    readPersonalNotes(db, user_id) {
        db.all('SELECT * FROM note WHERE author_id = ?', user_id);
    }

    readNote(db, id) {
        db.get('SELECT * FROM note WHERE id = ?', id);
    }

    readNoteId(db, id) {
        db.get('SELECT id FROM note WHERE id = ?', id);
    }

    update(db, body) {
        db.run('UPDATE note SET body ="' + body);
    }

    delete(db, id) {
        db.run('DELETE FROM note WHERE id = ?', id);
    }
}

module.exports = NotesController;