
import Knex from 'knex';
import {Application} from '../declarations';

// add database constraints (unique, foreign...)
export default async function (app: Application): Promise<Knex> {
    const db: Knex = app.get('knexClient');
    const usersTableName = 'users';
    const questionsTableName = 'questions';
    const answersTableName = 'answers';
    const rankingsTableName = 'rankings';

    // wait for all database tables to be created
    const tableNames = [usersTableName, questionsTableName, answersTableName, rankingsTableName];
    for (let tableName of tableNames)
        while (! await db.schema.hasTable(tableName))
            null;

    // add foreign key on questions.authorId
    db.schema.hasColumn(questionsTableName, 'authorId').then(async (exists) => {
        if (!exists) {
            await db.schema.table(questionsTableName, table => {
                table.integer('authorId').references('id').inTable(usersTableName);
            });
        }
    });

    // add foreign key on answers.userId
    db.schema.hasColumn(answersTableName, 'userId').then(async (exists) => {
       if (!exists) {
           await db.schema.table(answersTableName, table => {
               table.integer('userId').references('id').inTable(usersTableName);
           });
       }
    });

    // add foreign key on answers.questionId and unique on [userId, questionId]
    db.schema.hasColumn(answersTableName, 'questionId').then(async (exists) => {
        if (!exists) {
            await db.schema.table(answersTableName, table => {
                table.integer('questionId').references('id').inTable(questionsTableName);
                table.unique(['userId', 'questionId']);
            });
        }
    });

    // add foreign key on rankings.godsonId
    db.schema.hasColumn(rankingsTableName, 'godsonId').then(async (exists) => {
        if (!exists) {
            await db.schema.table(rankingsTableName, table => {
                table.integer('godsonId').references('id').inTable(usersTableName);
            });
        }
    });

    // add foreign key on rankings.godfatherId, unique on [godfatherId, godsonId] and unique on [godfatherId, rank]
    db.schema.hasColumn(rankingsTableName, 'godfatherId').then(async (exists) => {
        if (!exists) {
            await db.schema.table(rankingsTableName, table => {
                table.integer('godfatherId').references('id').inTable(usersTableName);
                table.unique(['godfatherId', 'godsonId']);
                table.unique(['godfatherId', 'rank']);
            });
        }
    });

    return db;
}
