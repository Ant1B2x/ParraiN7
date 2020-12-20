// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import nodemailer from 'nodemailer';
import {UserData} from "../../services/users/users.class";


// send a generate token to user email in order to confirm his account
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {

        // only if an email account is specified in config (production)
        if (context.app.get('emailAccount')) {

            // find user
            const user: UserData = (await context.service.find({
                query: {
                    email: context.data['email']
                }
            }))[0];

            // generate token
            const token = Math.floor(100000 + Math.random() * 900000);

            // insert token in database
            context.app.service('tokens').create({
                token: token,
                userId: user.id
            });

            // send email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: context.app.get('emailAccount').email,
                    pass: context.app.get('emailAccount').password
                }
            });
            const url = context.app.get('authentication').jwtOptions.audience + '/#/token';
            const mailOptions = {
                from: 'ParraiN7 <noreply.parrain7@gmail.com>',
                to: user.email,
                subject: 'Confirmez votre compte',
                html:
                    `<p>Ci-dessous ton token tant désiré, à rentrer sur
                    <a href="${url}">ParraiN7</a></p>
                    <h3>${token}</h3>`
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error)
                    console.log(error);
                else
                    console.log('Email send: ' + info.response);
            });

        }

        return context;
    };
};
