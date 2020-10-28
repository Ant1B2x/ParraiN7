// rankings-model.ts
//
// See http://knexjs.org/
// for more of what you can do here.
import {Application} from '../declarations';
import Knex from 'knex';

export default function (app: Application): Knex {
    const db: Knex = app.get('knexClient');
    const tableName = 'rankings';

    db.schema.hasTable(tableName).then(exists => {
        if (!exists) {
            db.schema.createTable(tableName, table => {
                table.uuid('godfatherId').references('id').inTable('users');
                table.uuid('godsonId').references('id').inTable('users');
                table.primary(['godfatherId', 'godsonId']);

                table.integer('rank').notNullable();


            })
                .then(() => console.log(`Created ${tableName} table`))
                .catch(e => console.error(`Error creating ${tableName} table`, e));
        }
    });

    return db;
}
