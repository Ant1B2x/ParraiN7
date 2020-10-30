# S'authentifier avec Feathers

L'authentification est déjà mise en place avec Feathers !
Cette documentation expliquera comment s'authentifier côté serveur et côté client.

## Côté serveur

- Faire une requête `POST` au service `authentication` pour récupérer un token :
  
  ```shell
  curl -X POST localhost:3030/authentication -H 'Content-Type: application/json' -d '{"strategy":"local","email":"<username>","password":"<password>"}
  ```
  
- Copier-coller le `accessToken` retourné

- L'intégrer dans une requête nécessitant d'être authentifié :

  ```shell
  curl -X GET localhost:3030/users -H 'Authorization: Bearer <accessToken>'
  ```

**C'est bon !**

## Côté client

##### TODO



## Ressources

https://youtu.be/V-G9UDKa5Do



