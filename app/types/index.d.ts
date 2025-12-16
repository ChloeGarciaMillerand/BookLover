// Book used in home page
export type HomePageBook = {
    id: string;
    title: string;
    author?: string | null;
    genre?: {
        id: string;
        name: string;
        color: string;
    } | null;
};

// List used in home page
export type HomePageList = {
    id: string;
    name: string;
    books: HomePageBook[];
    organization?: {
        id: string;
        name: string;
    };
};

export type Genre = {
    id: string;
    name: string;
    color: string;
    created_at: string;
};

export type Book = {
    id: string;
    title: string;
    author: string | null;
    editor: string | null;
    library_code: string | null;
    comment: string | null;
    ISBN: string | null;
    genre: {
        id: string;
        name: string;
        color: string;
    } | null;
};

export type List = {
    id: string;
    name: string;
    organization_id?: string;
};
