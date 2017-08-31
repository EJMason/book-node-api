export interface LibFormat {
  users_id: string | number;
  books_id: string | number;
  userName?: string;
  read?: boolean;
}
export interface User {
  user_name: string;
  id: number;
}

interface Book {
  book_id?: number;
  title: string;
  author_id?: number;
  author: Author;
}
interface Author {
  name: string;
  author_id?: number;
}

//export as namespace Global;
// export global;
