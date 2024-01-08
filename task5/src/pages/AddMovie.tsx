import { FunctionComponent, useState } from "react";
import UpdateAndCreateMovie from "../components/UpdateAndCreateMovie/UpdateAndCreateMovie";
import { useMovieStore } from "../store/movieStore";
import { addAction } from "../helpers/actions";
import { useNavigate } from "react-router-dom";
 
const AddMovie: FunctionComponent = () => {
    const { addMovie } = useMovieStore();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(false);
    
    const add = async (formData: FormData) => {
        try {
            setLoading(true);
            const addData = (await addAction(formData)).data
            addMovie(addData);
            navigate(`/movies/${addData.id}`)
        } catch (e) {
            console.error(e);
            navigate(`/`)
        } finally {
            setLoading(false);
        }
    }

    return ( 
        <UpdateAndCreateMovie title="Добавление нового фильма" handler={add} isLoading={isLoading} />
    );
}
 
export default AddMovie;