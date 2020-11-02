# Mise en place de serveur PostgreSQL

## Mise en place Linux (à adapter pour Windows)

- Installer les paquets

  ```shell
  # sudo pacman -Syu postgresql postgresql-libs
  sudo apt install postgresql postgresql-contrib
  ```

- Créer dossier `data`

  ```shell
  sudo mkdir -p /var/lib/postgres/data
  sudo chown postgres:postgres /var/lib/postgres/data
  sudo chmod 700 /var/lib/postgres/data
  ```

- Initialiser la base

  ```shell
  sudo -u postgres -s
  initdb --locale en_US.UTF-8 -E UTF8 -D '/var/lib/postgres/data'
  exit
  ```

- Démarrer et activer le service

  ```shell
  sudo systemctl start postgresql
  sudo systemctl enable postgresql
  ```

- Déclarer compte utilisateur en tant qu'admin de la DB

  ```shell
  sudo -u postgres -s
  createuser -s <username>
  exit
  ```

Pour une utilisation sans mot de passe, il faut modifier le /etc/postresql/{version}/main/pg_hba.conf
Il faut que la ligne suivante apparaîsse (ou remplacer ce qu'il y a à la place du trust par trust) : 
`host    all             all             127.0.0.1/32            trust`
Ensuite, lancer la commande `passwd --delete postgres`

- Créer la base `parrain7`

  ```shell
  createdb parrain7
  ```

**C'est bon !**

## Mise en place Windows

[Installation de base](https://www.veremes.com/installation-postgresql-windows)

Si quand on lance le serveur,  on obtient l'erreur `TypeError [ERR_INVALID_ARG_TYPE]: The "key" argument must be of type string or an instance of Buffer, TypedArray, DataView, or KeyObject. Received null`, il faut alors renseigner le mot de passe dans server/config/default.json.
```
"postgres": {
    "client": "pg",
    "connection": "postgres://postgres:{mot_de_passe}@localhost:5432/parrain7"
  }
```

Pour une utilisation sans mot de passe, il faut modifier le fichier pg_hba.conf dans le dossier data de PostgreSQL.
Il faut que la ligne suivante apparaîsse (ou remplacer ce qu'il y a à la place du trust par trust) : 
`host    all             all             127.0.0.1/32            trust`
Ensuite, se connecter avec `psql postgres` et lancer la commande SQL `ALTER USER postgres PASSWORD ''`

##### Ensuite, pour utiliser PostgreSQL en ligne de commande avec psql, sous windows

1. Ajouter le répertoir `bin` de PostgreSQL bin à la variable d'environnement PATH .

    1. Touche windows, et taper "Variables", et cliquez sur "Modifier les variables d'environnement système"

    2. Dans la fenêtre qui s'ouvre, cliquer sur "Variables d'environnement...", en bas de la-dite fenêtre.

    3. Dans la partie "Variable utilisateur pour {nom_utilisateur}", double-cliqué sur la variable "Path".

    4. Dans la fenêtre qui s'ouvre, double-cliquez sur une ligne vide, et renseignez le chemin jusqu'au fichier `bin` de PostgreSQL

        (Usuellement : `C:\Program Files\PostgreSQL\{n°_version}\bin`)

2. Ouvrir PowerShell:

    * Lancez la commande:
        `psql -U postgres`
    * Entrez le mot de passe super utilisateur que vous avez renseigné lors de l'installation.
##### TODO

