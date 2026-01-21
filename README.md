# Identité : Hugo Bequet
2ème année de BUT informatique

# Ce que j'ai compris du cours
Il existe une différence entre une application web et un site web.

Un site web est un domaine unique et donc est en général plus simple (voire statique) alors qu'une application web possède plusieurs domaines.

Une application web est séparée en 3 couches :
- front-end : l'interface utilisateur
- back-end : ce qui s'occupe de gérer les actions d'un utilisateur sur l'interface utilisateur
- base de données : s'occupe de gérer le stockage des données pour l'application

Le front-end communique avec le back-end via une API. Et le back-end communique directement avec la base de données.

Il y a également plusieurs manières de rendre l'application. Soit CSR (Client Side Rendering) soit SSR (Server Side Rendering).

L'avantage de CSR est que tout est calculé côté client et donc plus rapide à l'utilisation (même si nécessitant de charger des données au début).

L'avantage du SSR au contraire est que tout est chargé à la demande.
C'est aussi son défaut puisqu'une latence du serveur induit également à une latence pour l'utilisateur.
Mais sans temps de chargement au début.

Il y a également les différents types de piles techniques représentants l'ensemble de technologies utilisées pour faire fonctionner une application web.

# Pour ce qui est de Netflix ?
Netflix étant un projet qui n'a pas forcément besoin d'être rapide à l'utilisation mais de pouvoir rapidement se charger, il vaudrait mieux opter pour une application avec un rendu SSR.

Dans le front-end Netflix il y a une sidebar permettant la navigation à travers l'application. 
Un menu principal permettant de visualiser les séries et films avec une image disponibles triés par catégorie. 
Il y a également une bar de recherche permetttant de lancer un nouveau menu n'affichant que des programmes correspondant à la recherche. 
Pour éviter la surcharge de données il vaut mieux opter pour du lazy loading (permet d'autoriser l'infinite scroll en évitant la dégradation des performances).

Dans le back-end il y a des routes permettant d'obtenir toutes les séries mais également de les charger par block.

# Affichage page d'accueil
Sur la page d'accueil, il y a un texte en haut à gauche avec une bar de recherche à droite.

Ensuite une liste de carrouselle accompagnée d'un titre représentant chaque catégorie. 
Le carrousselle contient donc les images de chaque présentation de chaque programme.

La sidebar se situe à gauche de la page.
La sidebar permet de se login, d'aller sur la home page (via une icon à en haut à gauche), d'aller dans les paramètres, de gérer son compte.

Au hover d'une page de programme, la carte se grossie et une description apparait avec le titre en haut et en bas les catégories associées au programme.
