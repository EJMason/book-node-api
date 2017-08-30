declare namespace Global {

}

export interface User {
  userName: string;
  id?: number;
}

interface Book {
  id?: number;
  title: string;
  author_id?: number;
  author: Author;
}
interface Author {
  name: string;
  id?: number;
}

//export as namespace Global;
// export global;
