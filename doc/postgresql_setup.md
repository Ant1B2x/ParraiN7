# Mise en place de serveur PostgreSQL

## Mise en place Linux (à adapter pour Windows)

- Installer les paquets

  ```bash
  # sudo pacman -Syu postgresql postgresql-libs
  sudo apt install postgresql postgresql-libs
  ```

- Créer dossier `data`

  ```bash
  sudo mkdir -p /var/lib/postgres/data
  sudo chown postgres:postgres /var/lib/postgres/data
  sudo chmod 700 /var/lib/postgres/data
  ```

- Initialiser la base

  ```bash
  sudo -u postgres -s
  initdb --locale en_US.UTF-8 -E UTF8 -D '/var/lib/postgres/data'
  exit
  ```

- Démarrer et activer le service

  ```bash
  sudo systemctl start postgresql
  sudo systemctl enable postgresql
  ```

- Optionnel : Déclarer compte utilisateur en tant qu'admin de la DB

  ```bash
  sudo -u postgres -s
  createuser -s <username>
  exit
  ```

- Créer la base `parrain7`

  ```bash
  createdb parrain7
  ```

**C'est bon !**

## Mise en place Windows

##### TODO

