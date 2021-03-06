// users-model.ts - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import {Application} from '../declarations';
import Knex from 'knex';

export default function (app: Application): Knex {
    const db: Knex = app.get('knexClient');
    const tableName = 'users';

    db.schema.hasTable(tableName).then(exists => {
        if (!exists) {
            db.schema.createTable(tableName, table => {
                table.increments('id');
                table.string('email').unique().notNullable();
                table.string('password').notNullable();
                table.string('firstname');
                table.string('lastname');
                table.boolean('isGodfather').notNullable();
                table.boolean('isAdmin').defaultTo(0).notNullable();
            })
                .then(() => console.log(`Created ${tableName} table`))
                .catch(e => console.error(`Error creating ${tableName} table`, e));
        }
    });

    return db;
}
