create or replace function create_book(
  title_input text,
  list_id_input uuid,
  genre_id_input uuid default null,
  author_input text default null,
  editor_input text default null,
  library_code_input text default null,
  comment_input text default null,
  isbn_input text default null
)
returns setof book as $$
  declare new_book book;
  begin
    -- create book
    insert into book(
      title,
      genre_id,
      author,
      editor,
      library_code,
      comment,
      "ISBN")
    values (
      title_input,
      genre_id_input,
      author_input,
      editor_input,
      library_code_input,
      comment_input,
      isbn_input
    )
    returning * into new_book;
    -- link book to list
    insert into booklist(book_id, list_id)
    values(new_book.id, list_id_input);
    return next new_book;
  end;
$$ language plpgsql;