# BookLover

Ce projet est un **monorepo** contenant :

- un **backend** (Express + Sequelize + PostgreSQL)
- un **frontend** (React + Vite)
- une configuration partagée pour les outils avec Biome

## Outils utilisés

Frontend : React, Vite, TypeScript

Backend : Express, Sequelize, PostgreSQL

Lint/Format : Biome

Monorepo : npm Workspaces

## Installation

Depuis la racine du projet :

```bash
npm install
```

## Scripts disponibles

- `npm run dev:back` lance le backend avec nodemon
- `npm run dev:front` lance le frontend avec Vite
- `npm run format` formate tout le code du projet avec Biome

### Production / test

- `npm run start:back` démarre le backend avec node
- `npm run build:front` compile le frontend avec TypeScript et Vite

## Environnement

- Ajouter un fichier .env dans packages/backend (voir fichier .env.example)
- Un fichier .env sera à ajouter à la racine du front

## Formatage et Lint

- Pour lancer Biome -> depuis la racine: `npm run format`

## Maquette Figma:

Lien vers la maquette: https://www.figma.com/design/0OzqafsT6RM6eDxCuMQLAD/Book-Lover?node-id=0-1&t=T9r5oZG4vrg0cfKS-1