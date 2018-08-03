class TagsController {
    constructor() {
        this.id = id;
        this.body = body;
    }

    create(db, body, author_id) {
        db.run('INSERT INTO note(body, author_id) VALUES ("' + body + '","' + author_id + '")');
    }

    readAllTags(db) {
        db.all('SELECT * FROM note');
    }

    readTag(db, id) {
        db.get('SELECT * FROM note WHERE id = ?', id);
    }

    readTagId(db, id) {
        db.get('SELECT id FROM note WHERE id = ?', id);
    }

    update(db, body) {
        db.run('UPDATE note SET body ="' + body);
    }

    delete(db, id) {
        db.run('DELETE FROM note WHERE id = ?', id);
    }
}

module.exports = TagsController;