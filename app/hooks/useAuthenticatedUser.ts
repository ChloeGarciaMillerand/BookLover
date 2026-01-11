import { useOutletContext } from "react-router";
import type { User } from "~/types";

type ContextType = {
    user: User | null;
};

export const useAuthenticatedUser = () => {
    const { user } = useOutletContext<ContextType>();

    if (!user) {
        throw new Error("useAuthenticatedUser is called in a page not protected by auth middleware");
    }
    return user;
};
