import { useState, type ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";

const NOTES_PER_PAGE = 12;

const App = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value.trim());
  }, 500);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    setPage(1);
    updateSearchQuery(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, searchQuery],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: NOTES_PER_PAGE,
        search: searchQuery,
      }),
    placeholderData: (previousData) => previousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={setPage}
          />
        )}

        <button
          className={css.button}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <p className={css.status}>Loading notes...</p>}
      {isError && (
        <p className={css.error}>
          Unable to load notes. Check your access token and try again.
        </p>
      )}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data && !isLoading && data.notes.length === 0 && (
        <p className={css.status}>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
