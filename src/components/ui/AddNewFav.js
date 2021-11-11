import { useDispatch } from "react-redux";
import { eventClearActive } from "../../actions/calendar";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFav = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch( eventClearActive() );
        dispatch( uiOpenModal() );
    }

    return (
        <button className="btn btn-primary fav" onClick={handleClick}>
            <i className="fas fa-plus"></i>
        </button>
    )
}