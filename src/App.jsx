import { Component } from "react";

const books = [
  { title: "1984", author: "George Orwell", year: "1949" },
  { title: "Anna Karenina", author: "Leo Tolstoy", year: "1877" },
  { title: "Brave New World", author: "Aldous Huxley", year: "1932" },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: "1866" },
  { title: "Don Quixote", author: "Miguel de Cervantes", year: "1605" },
  { title: "Dracula", author: "Bram Stoker", year: "1897" },
  { title: "Frankenstein", author: "Mary Shelley", year: "1818" },
  { title: "Great Expectations", author: "Charles Dickens", year: "1860" },
  { title: "Jane Eyre", author: "Charlotte Brontë", year: "1847" },
  { title: "Les Misérables", author: "Victor Hugo", year: "1862" },
  { title: "Moby-Dick", author: "Herman Melville", year: "1851" },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    year: "1967",
  },
  { title: "Pride and Prejudice", author: "Jane Austen", year: "1813" },
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    year: "1880",
  },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", year: "1951" },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    year: "1844",
  },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: "1925" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", year: "1937" },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: "1954" },
  { title: "The Odyssey", author: "Homer", year: "-800" },
  { title: "The Picture of Dorian Gray", author: "Oscar Wilde", year: "1890" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", year: "1960" },
  { title: "War and Peace", author: "Leo Tolstoy", year: "1869" },
  { title: "Wuthering Heights", author: "Emily Brontë", year: "1847" },
];

class Book extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.book.title}</td>
        <td>{this.props.book.author}</td>
        <td>{this.props.book.year}</td>
      </tr>
    );
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
    this.props.filter(event.target.value);
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.onChange}
        placeholder={this.props.placeholder}
        value={this.state.value}
      />
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "title" };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(event) {
    const option = this.props.options[event.target.selectedIndex];
    this.setState((prev) => {
      prev.value = option;
      return prev;
    });
  }

  render() {
    const options = this.props.options.map((option, index) => {
      return (
        <option key={index} value={option}>
          {option}
        </option>
      );
    });

    return (
      <>
        <Input filter={this.props.filter(this.state.value)} />
        <select
          name="searchBy"
          id="1"
          onChange={this.onSelect}
          value={this.state.value}
        >
          {...options}
        </select>
      </>
    );
  }
}

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: books,
      filteredBooks: [...books],
      currentOrder: "asc",
    };
    this.filter = this.filter.bind(this);
    this.sort = this.sort.bind(this);
  }

  filter() {
    return (searchBy) => {
      return (inputValue) => {
        this.setState((prev) => {
          prev.filteredBooks = prev.books.filter((book) =>
            book[searchBy].toLowerCase().startsWith(inputValue.toLowerCase())
          );
          return prev;
        });
      };
    };
  }

  sort() {
    this.setState((prev) => {
      prev.filteredBooks = prev.filteredBooks.sort((a, b) => {
        if (prev.currentOrder === "asc") return b.title.localeCompare(a.title);
        return a.title.localeCompare(b.title);
      });
      prev.currentOrder = prev.currentOrder === "asc" ? "desc" : "asc";
      return prev;
    });
  }

  render() {
    const books = this.state.filteredBooks.map((book, index) => {
      return <Book key={index} book={book} />;
    });
    return (
      <>
        <Search options={["title", "author", "year"]} filter={this.filter()} />
        <table>
          <thead>
            <tr>
              <th>
                Title <p onClick={this.sort}>▼</p>
              </th>
              <th>Author</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>{...books}</tbody>
        </table>
      </>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Books />;
  }
}

export default App;
