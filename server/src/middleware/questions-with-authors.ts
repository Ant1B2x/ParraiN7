/* eslint-disable indent */
import {Request, Response, NextFunction} from 'express';
import Knex from 'knex';
import {Application} from '../declarations';

export default (app: Application) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (req: Request, res: Response) => {
        const db: Knex = app.get('knexClient');
        db('questions').join('users', 'users.id', 'questions.authorId')
            .select('questions.id as id', 'questions.content as content', 'users.firstname as firstname', 'users.lastname as lastname')
            .then( (questionsWithAuthors) => {
                res.status(200).send(questionsWithAuthors);
            }).catch( () => {
                res.status(204).send([]); // send no content and empty array if not found
        });
    };
};
