import { createContext, redirect, RouterContextProvider } from "react-router";
import { getSupabase } from "~/db/client";
import type { User } from "~/types";

export const userContext = createContext<User | null>(null);

// Server-side Authentication Middleware
export const authMiddleware = async ({
    request,
    context,
}: {
    request: Request;
    context: Readonly<RouterContextProvider>;
}) => {
    const { supabase } = getSupabase(request);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw redirect("/landing");
    }

    context.set(userContext, { id: user.id, email: user.email });
};

export const getCurrentUser = (context: Readonly<RouterContextProvider>): User => {
    const user = context.get(userContext);
    if (!user) {
        throw new Error("User is required");
    }
    return user;
};
