class TagsController {
    constructor() {
        this.id = id;
        this.body = body;
    }

    static create(db, body) {
        db.run('INSERT INTO note(body, author_id) VALUES ("' + body + '")');
    }

    static readAllTags(db) {
        db.all('SELECT * FROM tag');
    }

    static update(db, body) {
        db.run('UPDATE note SET body ="' + body);
    }

    static delete(db, id) {
        db.run('DELETE FROM note WHERE id = ?', id);
    }
}

module.exports = TagsController;