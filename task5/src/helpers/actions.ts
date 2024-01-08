import axios from "axios";
import { FavoriteI, MovieI } from "../models/types";

export async function deleteAction(movie: MovieI) {
  return axios.delete(`http://localhost:3000/movies/${movie.id}`);
}

export function editAction(formData: FormData, id: number) {
  const genres = (formData.get("genres") as string).split(",");
  const updates = Object.fromEntries(formData);
  return axios.put(`http://localhost:3000/movies/${id}`, {
    ...updates,
    genres,
  });
}

export async function addAction(formData: FormData) {
  const genres = (formData.get("genres") as string).split(",");
  const data = Object.fromEntries(formData);
  return axios.post(`http://localhost:3000/movies`, { ...data, genres });
}

export async function saveFavorite(movieId: number) {
  console.log("favorites", movieId);
  const favorite: { data: FavoriteI } = await axios.post(
    `http://localhost:3000/favorites`,
    { movieId }
  );
  return favorite.data;
}

export async function delFavorite(favorite: FavoriteI) {
  console.log("favorites", favorite);
  await axios.delete(`http://localhost:3000/favorites/${favorite.id}`);
}
