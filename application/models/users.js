class User {
    constructor() {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.notes_count = notes_count;
        this.birth_date = birth_date;
    }

    static create(db, email, password, name, phone, birth_date) {
        db.run('INSERT INTO user(email, password, name, phone, birth_date) VALUES ("' + email + '","' +
            password + '","' + name + '","' + phone + '","' + birth_date + '")');
    }

    static readAllUsers(db) {
        return db.all('SELECT * FROM user');
    }

    static readUser(db, id) {
        return db.get('SELECT * FROM user WHERE id = ?', id);
    }

    static update(db, password, name, phone, birth_date, id) {
        db.run('UPDATE user SET password ="' + password + '", name ="' + name + '", phone ="' + phone +
            '", birth_date ="' + birth_date + '" WHERE id = ?', id);
    }

    static delete(db, id) {
        db.run('DELETE FROM user WHERE id = ?', id);
    }

    static find(db, email) {
        db.run('SELECT * FROM user WHERE email = ?', email);
    }
}

module.exports = {User};