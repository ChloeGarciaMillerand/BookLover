// Book used in home page
export type HomePageBook = {
    id: number;
    title: string;
    author?: string;
    genre?: {
        name: string;
    };
};

// List used in home page
export type HomePageList = {
    id: number;
    name: string;
    books: HomePageBook[];
};

export type Genre = {
    name: string;
    color: string;
    CreatedAt: string;
};
