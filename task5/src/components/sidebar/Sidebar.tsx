import { FunctionComponent, useEffect, useState } from "react";
import MovieMenuItem from "./movieMenuItem/MovieMenuItem.tsx";
import { NavLink } from "react-router-dom";
import { useMovieStore } from "../../store/movieStore.ts";
import { moviesLoader } from "../../helpers/loaders.ts";
import "./sidebar.css";

interface sidebarProps {}

const Sidebar: FunctionComponent<sidebarProps> = () => {
  const { movies, setMovies } = useMovieStore();
  const [search, setSearch] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(search);
  };

  const fetchData = async (q?: string) => {
    try {
      setLoading(true);
      setMovies(await moviesLoader(q));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="sidebar" className="sidebar">
        <div className=" p-4">
          <form onSubmit={handleSubmit} className="sidebar-search">
            <input
              id="q"
              placeholder="Поиск фильма"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search input"
              name="q"
            />
            <div className="h-full w-32">
              <button
                type="submit"
                className={`button ${isLoading && "disabled"}`}
                disabled={isLoading}
              >
                {!isLoading ? (
                  <p>Найти</p>
                ) : (
                  <div className="black-loader"></div>
                )}
              </button>
            </div>
          </form>
        </div>
        <nav className="sidebar-main">
          <ul className="sidebar-list">
            {isLoading ? (
              <>
                <MovieMenuItem />
                <MovieMenuItem />
                <MovieMenuItem />
                <MovieMenuItem />
                <MovieMenuItem />
                <MovieMenuItem />
                <MovieMenuItem />
                <MovieMenuItem />
              </>
            ) : movies && movies.length ? (
              movies.map((movie) => (
                <li key={movie.id}>
                  <MovieMenuItem movie={movie} />
                </li>
              ))
            ) : (
              <>
                <p>Фильмы не найдены :(</p>
              </>
            )}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div>
            Найдено <span className="font-bold">{movies?.length || 0}</span>{" "}
            элементов
          </div>
          <div className="w-32">
            <NavLink to="/movies/add" className="button">
              Добавить
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
