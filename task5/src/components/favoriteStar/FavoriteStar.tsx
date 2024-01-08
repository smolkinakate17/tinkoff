import { FunctionComponent, useState } from "react";
import { useFavoriteStore } from "../../store/favoriteStore";
import { FavoriteI, MovieI } from "../../models/types";
import { delFavorite, saveFavorite } from "../../helpers/actions";
import "./favoriteStar.css";

interface FavoriteStarProps {
  movie: MovieI;
}

const FavoriteStar: FunctionComponent<FavoriteStarProps> = ({
  movie,
}: FavoriteStarProps) => {
  const { favorites, removeFavorite, addFavorite } = useFavoriteStore();
  const [isLoading, setLoading] = useState<boolean>(false);

  const changeFavorite = async (
    favorite: FavoriteI | undefined,
    movie: MovieI
  ) => {
    try {
      setLoading(true);
      if (favorite) {
        await delFavorite(favorite);
        removeFavorite(favorite);
      } else {
        addFavorite(await saveFavorite(movie.id));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`star-button ${isLoading && "animate-spin"}`}
      disabled={isLoading}
      onClick={() =>
        changeFavorite(
          favorites.find((x) => x.movieId == movie.id),
          movie
        )
      }
    >
      {favorites.find((x) => x.movieId == movie.id) ? (
        <img src="/img/star_fill.svg" />
      ) : (
        <img src="/img/star_empty.svg" />
      )}
    </button>
  );
};

export default FavoriteStar;
