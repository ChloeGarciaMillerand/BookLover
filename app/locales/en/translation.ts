const messages = {
    meta: {
        landing: {
            title: "BookLover - Welcome",
            description: "BookLover, organize your reading easily!",
        },
        home: {
            title: "BookLover - Home",
            description: "Welcome to your book manager!",
        },
        addList: {
            title: "BookLover - Create a list",
            description: "Create a new BookLover reading list",
        },
    },
    "404": {
        title: "Oops",
        text: "The requested page could not be found.",
        backHome: "Back to Home",
    },
    landing: {
        homeText1: "The application that makes reading easier for you!",
        homeText2: "Create your reading lists and",
        homeText3: "find your favorite books",
        homeText4: "wherever you are.",
        listsTitle: "Create your reading lists",
        listsTextSpan: "Add, update, delete your lists ",
        listsText: "to organize and find your books more easily.",
        genresTitle: "Add personalized genres",
        genresTextSpan: "Create your own genres ",
        genresText: "to categorize your books in a way that suits you.",
        keepYourBooksTitle: "Keep your books with you",
        keepYourBooksText:
            "Save books you’re interested in and access your lists at the library, at a friend’s place, or in a bookstore to discover your next read.",
    },
    home: {
        title: "My Lists",
        emptyMessage: "You have no lists yet. <br /> Start by creating one.",
        createListButton: "Create a list",
        editListButton: "Edit",
        editListButtonAria: "Edit the list",
        deleteListConfirm: 'Delete the list "{{name}}" and the books it contains?',
        deleteListButton: "Delete",
        deleteListButtonAria: "Delete the list",
    },
    createList: {
        successMessage: "List created successfully!",
        errorMessage: "An error occurred while creating the list",
        title: "Create a list",
    },
    createListForm: {
        errorMessage: "Name list is required",
        nameLabel: "List name",
        namePlaceholder: "My favorite books",
        submitButton: "Create a list",
        cancelButton: "Cancel",
    },
    buttons: {
        signupButton: "Sign Up",
        signinButton: "Sign In",
    },
};

export default messages;

export type Translations = typeof messages;
