ALTER TABLE rankings
ADD FOREIGN KEY ("godfatherId")
REFERENCES users(id);

ALTER TABLE rankings
ADD FOREIGN KEY ("godsonId")
REFERENCES users(id);

ALTER TABLE answers
ADD FOREIGN KEY ("userId")
REFERENCES users(id);

ALTER TABLE answers
ADD FOREIGN KEY ("questionId")
REFERENCES questions(id);
