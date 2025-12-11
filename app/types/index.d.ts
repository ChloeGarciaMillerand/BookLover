// Book used in home page
export type HomePageBook = {
    id: string;
    title: string;
    author?: string;
    genre?: {
        id: string;
        name: string;
        color: string;
    };
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
    CreatedAt: string;
};
