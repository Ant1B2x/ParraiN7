# Mise en place de serveur PostgreSQL

## Mise en place Linux (à adapter pour Windows)

- Installer les paquets

  ```shell
  # sudo pacman -Syu postgresql postgresql-libs
  sudo apt install postgresql postgresql-libs
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

- Créer la base `parrain7`

  ```shell
  createdb parrain7
  ```

**C'est bon !**

## Mise en place Windows

##### TODO

