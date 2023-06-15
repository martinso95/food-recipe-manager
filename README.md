# Food Recipe Manager

![App logo](/public/repo-logo.png?raw=true)

Food Recipe Manager is a simple website for storing and viewing your food recipes online. The website is built to provide a good user experience on both mobile and desktop. It is currently available [Here!](https://food-recipe-manager.vercel.app)

## Note

This is my hobby project which I work on when I have time. It helps me keep up with tech and lets me try new things. But I also love food and cooking, and I have always wanted a personalized recipe book online where I can store and view my recipes anywhere, with either my phone or computer.

The website is currently only for private use. Even if it is deployed on the web, you would need an invite in order to authenticate and start using the app. The reason behind this is because the database and storage used are on a free tier, which means very limited storage and bandwidth. Only enough for one user. There are no plans on expanding for public use right now. But if you are really curious and want to use it, you can easily clone this repo and setup this app. Just follow the instructions further down.

## Features

-   Authentication for private usage of your recipes
-   Add / Edit / Delete recipes
-   List view of recipes
-   Detailed view of a recipe
-   A recipe can contain:
    -   Image
    -   Name
    -   Description
    -   Time
    -   Servings
    -   Ingredients
    -   Instructions
-   Ingredients adjuster:
    -   When viewing a recipe, you can adjust an ingredient's amount according to how much you want to use. And then all other ingredients will adjust proportionally. (Very neat if a recipe requires 1000ml milk, but you only got 800ml. No need to do the maths.)
-   User interface supported on both mobile and desktop

## Main dependencies

-   Next.js 13

-   React

-   Tailwind CSS

-   NextAuth.js with Google provider (Authentication)

-   Firebase Firestore (Database)

-   Firebase Storage (Image storage)

-   Vercel (Deployment and hosting)

-   Plaiceholder (Image placeholder while loading full image)

## Do you want to setup a copy of this project?

I have no intention of commercialising this app and I am happy to share it. So feel free to clone it and use it as you wish. Just follow the steps below.

1. Clone this repo.

2. Install dependencies by running `yarn`

3. Rename `.env.example` to `.env.local`

This file is needed for local development. When deploying to production, you will instead need to add the same variables there.

4. Add the missing values (see the comments in the file for more details). Some values come from Firebase (storage and database) and Google cloud console (authentication). You will need to create and setup projects there.

5. Now you should be able to run a local version of the app. Just run `yarn dev`

6. If you would like to deploy the app, feel free to use any tool. I am using Vercel.
