
import Knex from 'knex';
import {Application} from '../declarations';

// add admin user by default
export default async (app: Application): Promise<Knex> => {
    const db: Knex = app.get('knexClient');
    const tableName: string = 'users';
    const adminEmail: string = 'admin@etu.toulouse-inp.fr';

    // wait for user table to be created
    while (! await db.schema.hasTable(tableName)) {}

    const users = await db(tableName).select().where({ email: adminEmail });
    if (users.length === 0)
        db(tableName).insert({
            email: adminEmail,
            password: '$2a$10$lKnnZ0F0NfMMw86ng/CP..9r1uU00/HjIPcYQ8/56Rb2RiLmuI4TS', // private password, already hashed
            firstname: 'Super',
            lastname: 'Admin',
            isGodfather: true,
            isAdmin: true
        }).then(() => {
            console.log(`Created ${adminEmail} user`);
        });

    return db;
}
