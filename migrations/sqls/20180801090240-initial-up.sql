PRAGMA foreign_keys = on;
CREATE TABLE user (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    phone INTEGER,
    notes_count INTEGER,
    birth_date DATE
);

CREATE TABLE note (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    body TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    creation_date DATE NOT NULL,
    tags_count INTEGER,
    FOREIGN KEY (author_id) REFERENCES user(id)
);

CREATE TABLE tag (
  id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
  body TEXT NOT NULL
);

CREATE TABLE note_has_tag (
  note_id INTEGER PRIMARY KEY NOT NULL,
  tag_id INTEGER NOT NULL,
  FOREIGN KEY (note_id) REFERENCES note(id),
  FOREIGN KEY (tag_id) REFERENCES tag(id)
);

CREATE TABLE note_has_user_like (
  user_id INTEGER PRIMARY KEY NOT NULL,
  note_id INTEGER NOT NULL,
  state TINYINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (note_id) REFERENCES note(id)
);