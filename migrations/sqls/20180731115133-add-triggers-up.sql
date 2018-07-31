CREATE TRIGGER notes_counter
AFTER INSERT ON note
BEGIN
UPDATE user SET notes_count = notes_count + 1 WHERE id IN (SELECT author_id FROM note);
END;

CREATE TRIGGER tags_counter
AFTER INSERT ON note_has_tag
BEGIN
UPDATE note SET tags_count = tags_count + 1 WHERE id IN (SELECT note_id FROM note_has_tag);
END;