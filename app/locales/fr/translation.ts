import type { Translations } from "~/locales/en/translation";

export default {
    meta: {
        landing: {
            title: "BookLover - Bievenue",
            description: "BookLover, organisez vos lectures facilement!",
        },
        home: {
            title: "BookLover - Accueil",
            description: "Bienvenue dans votre gestionnaire de livres!",
        },
    },
    "404": {
        title: "Oups",
        text: "Cette page n'existe pas",
        backHome: "Retour à l'accueil",
    },
    landing: {
        homeText1: "L'application qui vous facilite la lecture!",
        homeText2: "Créez vos listes de lecture et",
        homeText3: "retrouvez vos livres favoris",
        homeText4: "où qu vous soyez.",
        listsTitle: "Créez vos propres listes de lecture",
        listsTextSpan: "Ajoutez, modifiez, supprimez des listes",
        listsText: "pour organiser et retrouver vos livres plus facilement.",
        genresTitle: "Ajoutez des genres personnalisés",
        genresTextSpan: "Créez vos propres genres ",
        genresText: "pour catégoriser vos livres de la manière qui vous convient.",
        keepYourBooksTitle: "Gardez vos livres à portée de main",
        keepYourBooksText:
            "Notez les livres qui vous intéressent et consultez vos listes à la bibliothèque, chez un ami ou en librairie pour trouver votre prochaine lecture.",
    },
    home: {
        title: "Mes listes",
        emptyMessage: "Vous n'avez pas encore de listes. <br /> Commencez par en créer une.",
        createListButton: "Créer une liste",
        editListButton: "Modifier",
        editListButtonAria: "Modifier la liste",
        deleteListConfirm: 'Supprimer la liste "{{name}}" et les livres qu\'elle contient?',
        deleteListButton: "Supprimer",
        deleteListButtonAria: "Supprimer la liste",
    },
    buttons: {
        signupButton: "Créer un compte",
        signinButton: "Se connecter",
    },
} satisfies Translations;
