-- questions table
ALTER TABLE questions
    ADD FOREIGN KEY ("authorId")
        REFERENCES users(id);

-- answers table
ALTER TABLE answers
    ADD FOREIGN KEY ("userId")
        REFERENCES users (id),
    ADD FOREIGN KEY ("questionId")
        REFERENCES questions (id);

-- rankings table
ALTER TABLE rankings
    ADD FOREIGN KEY ("godsonId")
        REFERENCES users (id),
    ADD FOREIGN KEY ("godfatherId")
        REFERENCES users (id);
