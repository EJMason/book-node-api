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
  books_id?: number;
  title: string;
  authors_id?: number;
  author: Author;
  id?: any;
}
interface Author {
  name: string;
  authors_id?: number;
}

//export as namespace Global;
// export global;
