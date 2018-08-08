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
        db.run('INSERT INTO user(id, email, password, name, phone, notes_count, birth_date) VALUES ("' + email + '","' +
            password + '","' + name + '","' + phone + '","' + 0 + '","' + birth_date + '")');
    }

    static readAllUsers(db) {
        db.all('SELECT * FROM user');
    }

    static readUser(db, id) {
        db.get('SELECT * FROM user WHERE id = ?', id);
    }

    static update(db, password, name, phone, birth_date) {
        db.run('UPDATE user SET password ="' + password + '", name ="' + name + '", phone ="' + phone +'", birth_date ="' + birth_date);
    }

    static delete(db, id) {
        db.run('DELETE FROM user WHERE id = ?', id);
    }
}

module.exports = {User};