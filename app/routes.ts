import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    // LIST
    route("list/:id", "routes/list.tsx"),
    route("add-list", "routes/addList.tsx"),
    route("edit-list/:id", "routes/editList.tsx"),
    route("delete-list/:id", "routes/deleteList.tsx"),
    // BOOK
    route("list/:id/add-book", "routes/addBook.tsx"),
    route("list/:listId/edit-book/:bookId", "routes/editBook.tsx"),
    // GENRE
    route("add-genre", "routes/addGenre.tsx"),
] satisfies RouteConfig;
