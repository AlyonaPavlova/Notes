CREATE TABLE IF NOT EXISTS user (
	id INT AUTO_INCREMENT UNIQUE,
	email VARCHAR(64) UNIQUE,
	password VARCHAR(32) NOT NULL,
	name VARCHAR(64) NOT NULL,
	phone INT NULL,
	birth_date DATE NULL,
	notes_count INT,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS note (
	id INT AUTO_INCREMENT UNIQUE,
	creation_date DATE NOT NULL DEFAULT CURRENT_DATE,
	author_id INT NOT NULL,
	text VARCHAR(256) NOT NULL,
	tags_count INT,
   	PRIMARY KEY (id),
   	FOREIGN KEY (author_id)
);

CREATE TABLE user_has_note (
	user_id INT NOT NULL,
	note_id INT NOT NULL,
	state TINYINT NOT NULL,
	PRIMARY KEY (user_id, note_id),
	FOREIGN KEY (user_id),
	FOREIGN KEY (note_id)
);