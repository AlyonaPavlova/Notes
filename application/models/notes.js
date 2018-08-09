class Note {
    constructor() {
        this.id = id;
        this.body = body;
        this.author_id = author_id;
        this.creation_date = creation_date;
        this.tags_count = tags_count;
    }

    static create(db, body, author_id, date) {
        return db.run('INSERT INTO note(body, author_id, creation_date) VALUES ("' + body + '","' + author_id + '","' + date + '")');
    }

    static readAllNotes(db) {
        return db.all('SELECT * FROM note');
    }

    static readPersonalNotes(db, user_id) {
        return db.all('SELECT * FROM note WHERE author_id = ?', user_id);
    }

    static readNote(db, id) {
        return db.get('SELECT * FROM note WHERE id = ?', id);
    }

    static update(db, body) {
        return db.run('UPDATE note SET body ="' + body);
    }

    static delete(db, id) {
        return db.run('DELETE FROM note WHERE id = ?', id);
    }
}

module.exports = {Note};