
import Knex from 'knex';
import {Application} from '../declarations';
import {UserData} from '../services/users/users.class';

// add admin user by default
export default async (app: Application): Promise<Knex> => {
    const db: Knex = app.get('knexClient');
    const tableName: string = 'users';
    const adminEmail: string = 'admin@etu.toulouse-inp.fr';

    // wait for user table to be created
    while (! await db.schema.hasTable(tableName)) {}

    // check if admin user already exists
    const users = await db(tableName).select().where({ email: adminEmail });
    // insert admin user into database
    if (users.length === 0) {
        const admin: UserData = {
            ...app.get('adminUser'), // the default admin password is 'admin'
            firstname: 'Super',
            lastname: 'Admin',
            isGodfather: true,
            isAdmin: true
        };

        await db(tableName).insert(admin);
        console.log(`Created ${admin.email} user`);
    }

    return db;
}
