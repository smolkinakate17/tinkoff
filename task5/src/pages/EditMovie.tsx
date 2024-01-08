import { FunctionComponent, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MovieI } from "../models/types";
import UpdateAndCreateMovie from "../components/UpdateAndCreateMovie/UpdateAndCreateMovie";
import { useMovieStore } from "../store/movieStore";
import { editAction } from "../helpers/actions";
 
const EditMovie: FunctionComponent = () => {
    const movie: MovieI = (useLoaderData() as MovieI);
    const navigate = useNavigate();
    const { updMovie } = useMovieStore();
    const [isLoading, setLoading] = useState<boolean>(false)

    const editMovie = async (formData: FormData) => {
        try {
            setLoading(true);
            const editData = (await editAction(formData, movie.id)).data
            updMovie(editData);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            navigate(`/movies/${movie.id}`)
        }
    }

    return ( 
        <UpdateAndCreateMovie movie={movie} title="Редактирование информации о фильме" handler={editMovie} isLoading={isLoading} />
    );
}
 
export default EditMovie;