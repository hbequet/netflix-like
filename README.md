# Identité : Hugo Bequet

# Ce que j'ai compris du cours
Il existe une différence entre une application web et un site web.

Un site web est un domaine unique et donc est en général plus simple (voire statique) alors qu'une application web possède plusieurs domaines.

Une application web est séparée en 3 composants :
- front-end : l'interface utilisateur
- back-end : ce qui s'occupe de gérer les actions d'un utilisateur sur l'interface utilisateur
- base de données : s'occupe de gérer le stockage des données pour l'application

Il y a également plusieurs manières de rendre l'application. Soit CSR (Client Side Rendering) soit SSR (Server Side Rendering).

L'avantage de CSR est que tout est calculé côté client et donc plus rapide à l'utilisation (même si nécessitant de charger des données au début).

L'avantage du SSR au contraire est que tout est chargé à la demande.
C'est aussi son défaut puisqu'une latence du serveur induit également à une latence pour l'utilisateur.
Mais sans temps de chargement au début.

Il y a également les différents types de piles techniques représentants l'ensemble de technologies utilisées pour faire fonctionner une application web.
