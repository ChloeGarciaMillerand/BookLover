import { createCookieSessionStorage } from "react-router";

type SessionData = {
    token: string;
};

type SessionFlashData = {
    error?: string;
    success?: string;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
        name: "__session",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        secrets: [process.env.SESSION_SECRET || "big-secret"],
    },
});

export { getSession, commitSession, destroySession };
