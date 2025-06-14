export type User = {
    id: number;
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    CreatedAt: string;
    UpdatedAt: string;
};

export type HomePageBook = {
    id: number;
    title: string;
    author?: {
        firstname: string;
        lastname: string;
    };
    genre?: {
        name: string;
    };
};

export type HomePageList = {
    id: number;
    name: string;
    books: HomePageBook[];
};

export type BookList = {
    id: number;
    bookId: number;
    ListId: number;
    CreatedAt: string;
    UpdatedAt: string;
};

export type List = {
    id: number;
    name: string;
    position: number;
    CreatedAt: string;
    UpdatedAt: string;
};

export type Author = {
    id: number;
    lastname: string;
    firstname: string | null;
    nationality: string | null;
    CreatedAt: string;
    UpdatedAt: string;
};

export type Editor = {
    id: number;
    name: string;
    CreatedAt: string;
    UpdatedAt: string;
};

export type Genre = {
    id: number;
    name: string;
    CreatedAt: string;
    UpdatedAt: string;
};

export type Book = {
    id: number;
    title: string;
    isbn: string;
    year_published: number | null;
    description: string | null;
    pages: number | null;
    AuthorId: number | null;
    GenreId: number | null;
    EditorId: number | null;
    CreatedAt: string;
    UpdatedAt: string;
};
