import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // PUBLIC ROUTE
    // LANDING
    route("landing", "routes/landing.tsx"),

    // AUTHENTIFICATION
    route("signup", "routes/auth/signup.tsx"),
    route("signin", "routes/auth/signin.tsx"),
    route("signout", "routes/auth/signout.tsx"),

    // ROUTES WITH AUTHENFICATION REQUIRED
    // HOME
    index("routes/home.tsx"),
    // LIST
    route("list/:id", "routes/list/list.tsx"),
    route("add-list", "routes/list/addList.tsx"),
    route("edit-list/:id", "routes/list/editList.tsx"),
    route("delete-list/:id", "routes/list/deleteList.tsx"),
    // BOOK
    route("list/:id/add-book", "routes/book/addBook.tsx"),
    route("list/:listId/edit-book/:bookId", "routes/book/editBook.tsx"),
    route("list/:id/delete-book/:bookId", "routes/book/deleteBook.tsx"),
    // GENRE
    route("add-genre", "routes/genre/addGenre.tsx"),
] satisfies RouteConfig;
