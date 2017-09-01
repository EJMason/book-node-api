interface LibFormat {
  users_id: string | number;
  books_id: string | number;
  userName?: string;
  read?: boolean;
}
export interface User {
  user_name: string;
  users_id?: number;
}

export interface User_RAW {
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

interface RespError {
  status: number | string;
  message: string;
  code: number | null;
}

export as namespace Global;
// export = global;
