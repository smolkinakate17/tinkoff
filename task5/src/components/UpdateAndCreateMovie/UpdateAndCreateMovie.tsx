import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListViewer from "../listViewer/ListViewer";
import { genresLoader } from "../../helpers/loaders";
import { MovieI } from "../../models/types";
import { replaceNoneImg } from "../../helpers/imageHelper";
import "./updateAndCreateMovie.css";

interface UpdateAndCreateMovieProps {
  title: string;
  movie?: MovieI;
  handler: Function;
  isLoading: boolean;
}

const UpdateAndCreateMovie: FunctionComponent<UpdateAndCreateMovieProps> = ({
  title,
  movie,
  handler,
  isLoading,
}: UpdateAndCreateMovieProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setAllGenres(await genresLoader());
    };
    fetchData();
  }, []);

  const [selGenres, setSelGenres] = useState<string[]>(movie?.genres || []);
  const [allGenres, setAllGenres] = useState<string[]>([]);
  const [actor, setActor] = useState<string>("");
  const [actors, setActors] = useState<string[]>(
    movie?.actors?.split(",") || []
  );
  const [img, setImg] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handler(new FormData(event.currentTarget));
  };

  return (
    <div className="edit-container">
      <div className="edit-container__poster">
        <img
          className="edit-container__poster-img"
          key={movie?.posterUrl}
          src={img || movie?.posterUrl || "/img/noneImg.jpg"}
          alt="Картинка фильма"
          onError={(e) => replaceNoneImg(e)}
        />
      </div>
      <div className="edit-container__info">
        <form onSubmit={handleSubmit} className="form">
          <p className="text-3xl">{title}</p>
          <div className="edit-entry">
            <p className="edit-entry__title">Название:</p>
            <input
              className="input"
              name="title"
              type="text"
              defaultValue={movie?.title || ""}
              required
              disabled={isLoading}
            />
          </div>
          <div className="edit-entry">
            <p className="edit-entry__title">Постер:</p>
            <input
              className="input"
              name="posterUrl"
              type="text"
              defaultValue={movie?.posterUrl}
              onBlur={({ target }) => setImg(target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="edit-entry">
            <p className="edit-entry__title">Режиссёр:</p>
            <input
              className="input"
              name="director"
              type="text"
              defaultValue={movie?.director || ""}
              required
              disabled={isLoading}
            />
          </div>
          <div className="edit-entry">
            <p className="edit-entry__title">Год:</p>
            <input
              className="input"
              name="year"
              type="text"
              defaultValue={movie?.year || ""}
              required
              disabled={isLoading}
            />
          </div>
          <div className="edit-entry">
            <p className="edit-entry__title">Длительность:</p>
            <input
              className="input"
              name="runtime"
              type="number"
              min={0}
              defaultValue={movie?.runtime || 0}
              required
              disabled={isLoading}
            />
          </div>
          <div className="edit-entry">
            <p className="edit-entry__title">Жанры:</p>
            <div className="relative w-full">
              <input hidden name="genres" type="text" value={selGenres} readOnly />
              <ListViewer list={selGenres} setList={setSelGenres} />
              <div className="z-10 peer-focus/tags:block rounded-lg hover:block top-full left-0 right-0 absolute w-full hidden shadow-xl">
                <ul className="max-h-60 overflow-auto rounded-lg bg-white">
                  {allGenres.map((genre, genreIdx) =>
                    selGenres.find((x) => x === genre) ? (
                      <li
                        key={genreIdx}
                        className="cursor-pointer hover:bg-[#FFDD2D] p-1 px-3 bg-[#FFDD2D]"
                        onClick={() =>
                          setSelGenres(selGenres.filter((x) => x !== genre))
                        }
                      >
                        {genre}
                      </li>
                    ) : (
                      <li
                        key={genreIdx}
                        className="cursor-pointer hover:bg-[#FFDD2D] p-1 px-3"
                        onClick={() => setSelGenres([...selGenres, genre])}
                      >
                        {genre}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="edit-entry">
            <p className="edit-entry__title">Актёры:</p>
            <div className="relative w-full flex flex-col gap-4">
              <div className="flex gap-4">
                <input
                  form="none"
                  placeholder="Введите актера"
                  className="input"
                  name="actor"
                  value={actor}
                  onChange={({ target }) => setActor(target.value)}
                />
                <div className="w-40">
                  <button
                    type="button"
                    className={`button ${isLoading && "disabled"}`}
                    disabled={isLoading}
                    onClick={() => {
                      setActors([...actors, actor]);
                      setActor("");
                    }}
                  >
                    Добавить
                  </button>
                </div>
              </div>

              <input
                hidden
                name="actors"
                type="text"
                readOnly
                value={actors}
                disabled={isLoading}
              />
              <ListViewer list={actors} setList={setActors} />
            </div>
          </div>
          <div className="edit-entry">
            <p className="edit-entry__title">Описание:</p>
            <textarea
              className="input h-40 max-h-64"
              name="plot"
              defaultValue={movie?.plot || ""}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form__buttons">
            <div className="w-32">
              <button
                type="button"
                disabled={isLoading}
                className={`del-button ${isLoading && "disabled"}`}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Отмена
              </button>
            </div>
            <div className=" w-32">
              <button
                type="submit"
                className={`button ${isLoading && "disabled"}`}
                disabled={isLoading}
              >
                {!isLoading ? (
                  <p>Сохранить</p>
                ) : (
                  <div className="black-loader"></div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAndCreateMovie;
