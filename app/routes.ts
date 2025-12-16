import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("list/:id", "routes/list.tsx"),
    route("add-list", "routes/addList.tsx"),
    route("edit-list/:id", "routes/editList.tsx"),
    route("delete-list/:id", "routes/deleteList.tsx"),
    route("list/:id/add-book", "routes/addBook.tsx"),
] satisfies RouteConfig;
