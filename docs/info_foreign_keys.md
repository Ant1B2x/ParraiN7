# Informations à propos des clés étrangères

À cause de la gestion me*dique des contraintes de clés étrangères à la création des tables par Knex et PostgreSQL (voir https://github.com/knex/knex/issues/938), il a été décidé que les contraintes seraient ajoutées après-coup via le script `add_constraints.sql`. Voir la doc `postgresql_usage.md` pour voir comment faire.

Le soucis vient du fait que PostgreSQL va traiter toutes les transactions de création de table en même temps, et va potentiellement créer une table dépendante d'une autre table avant sa dépendance (ex : dans notre cas, `questions` avant `users`).

Il a aussi été convenu de faire un double-check du côté applicatif pour vérifier que l'on n'insère pas de données incohérentes. La souplesse qu'offre le traitement côté applicatif a motivé ce choix.

