export type Book = {
  id: number;
  in_stock: number;
  title: string;
  description: string;
  price: number;
  genres: number[];
  author: number[];
  release_date: string;
  writing_date: string;
};

export type Autor = {
  id: number;
  first_name: string;
  second_name: string;
};

export type Genreses = {
  id: number;
  title: string;
};
