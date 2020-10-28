# Utilisation de PostgreSQL

##### **Note : avant de suivre cette documentation, il faut avoir mis en place un serveur PostgreSQL (voir doc `postgresql_setup.md`).**

- Lancer le service si il ne l'est pas déjà

  ```bash
  sudo systemctl status postgresql
  sudo systemctl start postgresql
  ```

- Se connecter à la base `parrain7`

  ```shell
  psql parrain7
  ```

Une fois ici, vous aurez une console permettant de saisir toutes les commandes SQL (`INSERT`, `SELECT`, `DROP`, etc...).

