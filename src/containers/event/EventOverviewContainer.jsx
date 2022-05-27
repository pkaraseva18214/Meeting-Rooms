import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectEventById} from "../../ducks/events/selector";
import EventOverviewComponent from "../../components/event/EventOverviewComponent";
import MainPageContainer from "../mainpage/MainPageContainer";

function EventOverviewContainer() {
    const {id} = useParams();
    const event = useSelector(state => selectEventById(state, id));
    const navigate = useNavigate();

    if (event === undefined) {
        return (
            <MainPageContainer />
        );
    } else {
        return (
            <EventOverviewComponent
                event={event}
                navigate={navigate}
            />
        );
    }
}

export default EventOverviewContainer;