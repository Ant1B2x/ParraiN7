// rankings-model.ts - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import Knex from 'knex';
import {Application} from '../declarations';

export default function (app: Application): Knex {
    const db: Knex = app.get('knexClient');
    const tableName = 'rankings';

    db.schema.hasTable(tableName).then(exists => {
        if (!exists) {
            db.schema.createTable(tableName, table => {
                table.increments('id');
                table.integer('godfatherId').notNullable();
                table.integer('godsonId').notNullable();
                table.unique(['godfatherId', 'godsonId']);
                table.integer('rank').notNullable();
                table.unique(['godfatherId', 'rank']);
            })
                .then(() => console.log(`Created ${tableName} table`))
                .catch(e => console.error(`Error creating ${tableName} table`, e));
        }
    });

    return db;
}
