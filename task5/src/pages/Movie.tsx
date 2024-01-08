import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { replaceNoneImg } from "../helpers/imageHelper";
import { MovieI } from "../models/types";
import { useState } from "react";
import { deleteAction } from "../helpers/actions";
import { useMovieStore } from "../store/movieStore";
import FavoriteStar from "../components/favoriteStar/FavoriteStar";

export interface MovieProps {
  id: number;
  title: string;
  year: string;
  runtime: number;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
}

const Movie = () => {
  const { removeMovie } = useMovieStore();
  const navigate = useNavigate();
  const movie: MovieI = useLoaderData() as MovieI;
  const [isGenreOpen, setGenreOpen] = useState(false);
  const [isActorOpen, setActorOpen] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const deleteMovie = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      await deleteAction(movie);
      removeMovie(movie);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      navigate(`/`);
    }
  };

  return (
    <div className="flex grow">
      <div className="flex-shrink-0 ">
        <img
          className=" w-96 h-[36rem] object-cover rounded-lg bg-slate-400 shadow-2xl mb-4"
          key={movie.posterUrl}
          src={movie.posterUrl || "/img/noneImg.jpg"}
          alt="Картинка фильма"
          onError={(e) => replaceNoneImg(e)}
        />
        <div className="flex items-center gap-2 justify-between h-10">
          <NavLink
            to={"edit"}
            className={`button flex items-center gap-2 ${
              isLoading && "disabled"
            }`}
          >
            <div className="pl-2">
              <img className="w-5 h-5" src="/img/edit.svg" alt="" />
            </div>
            <p className="pr-5">Редактировать</p>
          </NavLink>

          <form method="post" action="destroy" onSubmit={deleteMovie}>
            <button
              type="submit"
              className={`del-button ${isLoading && "disabled"}`}
              disabled={isLoading}
            >
              {!isLoading ? (
                <img className="w-5 h-5" src="/img/trash.svg" alt="" />
              ) : (
                <div className=" animate-spin border-2 border-black/50 border-t-black border-l-black rounded-full h-4 w-4"></div>
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="ml-10 grow">
        <div className="flex justify-between grow">
          <h1 className=" text-6xl font-bold mb-10">
            {movie.title || "Нет названия"}
          </h1>
          <div className="w-16 h-16">
            <FavoriteStar movie={movie} />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-10">
          <p className="text-3xl">О фильме</p>

          <div className="flex">
            <p className="text-slate-500 text-xl w-60">Режиссёр:</p>
            <p className="text-slate-500 text-xl">
              {movie.director || "Нет имени"}
            </p>
          </div>
          <div className="flex">
            <p className="text-slate-500 text-xl w-60">Год производства:</p>
            <p className="text-slate-500 text-xl">{movie.year || "Нет года"}</p>
          </div>
          <div className="flex">
            <p className="text-slate-500 text-xl w-60">Длительность:</p>
            <p className="text-slate-500 text-xl">
              {movie.runtime
                ? `${Math.floor(movie.runtime / 60)}ч ${Math.floor(
                    movie.runtime % 60
                  )}м`
                : "0"}
            </p>
          </div>
          <div className="flex">
            <p className="text-slate-500 text-xl w-60">Жанры:</p>
            <div className="text-slate-500 text-xl">
              {(Array.isArray(movie.genres) ? movie.genres : [movie.genres])
                .slice(0, isGenreOpen ? movie.genres.length : 4)
                .map((genre, i) => (
                  <p
                    key={`${i}-${genre}`}
                    className="text-slate-500 text-xl w-60"
                  >
                    {genre}
                  </p>
                ))}
              {movie.genres.length > 4 && (
                <p
                  className="text-[#5ea9ff] cursor-pointer"
                  onClick={() => setGenreOpen(!isGenreOpen)}
                >
                  {isGenreOpen
                    ? "спрятать"
                    : `показать еще ${movie.genres.length - 4}`}
                </p>
              )}
            </div>
          </div>
          <div className="flex">
            <p className="text-slate-500 text-xl w-60">Актёры:</p>
            <div className="text-slate-500 text-xl flex flex-col">
              {movie?.actors
                ?.split(",")
                .slice(0, isActorOpen ? movie?.actors?.split(",").length : 4)
                .map((actor, i) => (
                  <p
                    key={`${i}-${actor}`}
                    className="text-slate-500 text-xl w-60"
                  >
                    {actor}
                  </p>
                )) || "Нет актёров"}
              {movie?.actors?.split(",").length > 4 && (
                <p
                  className="text-[#5ea9ff] cursor-pointer"
                  onClick={() => setActorOpen(!isActorOpen)}
                >
                  {isActorOpen
                    ? "спрятать"
                    : `показать еще ${movie?.actors?.split(",").length - 4}`}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-3xl">Описание</p>

          <p className="text-slate-500 text-xl">
            {movie.plot || "Нет описания"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
