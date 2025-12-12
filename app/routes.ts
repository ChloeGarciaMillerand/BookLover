import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("list/:id", "routes/list.tsx"),
    route("add-list", "routes/addList.tsx"),
] satisfies RouteConfig;
