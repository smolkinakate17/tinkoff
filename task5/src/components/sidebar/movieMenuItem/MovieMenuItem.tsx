import { FunctionComponent } from "react";
import { MovieI } from "../../../models/types";
import { replaceNoneImg } from "../../../helpers/imageHelper";
import { NavLink } from "react-router-dom";
import FavoriteStar from "../../favoriteStar/FavoriteStar";
import "./movieMenuItem.css";

interface MovieMenuItemProps {
  movie?: MovieI;
}

const MovieMenuItem: FunctionComponent<MovieMenuItemProps> = ({
  movie,
}: MovieMenuItemProps) => {
  return (
    <div className="menu-item">
      <NavLink
        to={movie ? `movies/${movie.id}` : ""}
        className={({ isActive, isPending }) => `menu-item__body
                ${
                  isActive && movie
                    ? "bg-[#ffed94]"
                    : isPending && movie
                    ? "bg-[#ffe561]"
                    : "bg-[#e6eaee]"
                }`}
      >
        <div className="menu-item__poster-container">
          <div className="menu-item__poster">
            {movie ? (
              <img
                className="menu-item__poster-img"
                key={movie.posterUrl}
                src={movie.posterUrl || "/img/noneImg.jpg"}
                alt="Картинка фильма"
                onError={(e) => replaceNoneImg(e)}
              />
            ) : (
              <div className="menu-item__poster-img-load"></div>
            )}
          </div>
        </div>
        <div className="menu-item__info">
          {movie ? (
            <>
              <h1 className="menu-item__info-title">
                {movie.title || "Нет названия"}
              </h1>
              <h1 className="menu-item__info-text">
                {movie.year || "Год отсутствует"}
              </h1>
              <h1 className="menu-item__info-text">
                {Array.isArray(movie.genres)
                  ? movie.genres.join(", ")
                  : movie.genres || ""}
              </h1>
            </>
          ) : (
            <div className="animate-pulse"></div>
          )}
        </div>
      </NavLink>
      {movie && (
        <div className="menu-item__star ">
          <FavoriteStar movie={movie} />
        </div>
      )}
    </div>
  );
};

export default MovieMenuItem;
