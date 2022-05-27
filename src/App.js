import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginComponent from "./components/authentification/LoginComponent";
import RegistrationComponent from "./components/authentification/RegistrationComponent";
import {PATH} from "./constants/mainConstants";
import CommonLayoutComponent from "./layouts/CommonLayoutComponent";
import AuthLayoutComponent from "./layouts/AuthLayoutComponent";
import NavBarContainer from "./containers/navbar/NavBarContainer";
import MainPageContainer from "./containers/mainpage/MainPageContainer";
import BookingContainer from "./containers/booking/BookingContainer";
import UserPageContainer from "./containers/userpage/UserPageContainer";
import EventOverviewContainer from "./containers/event/EventOverviewContainer";
import UserEventsContainer from "./containers/user-events/UserEventsContainer";
import NotFoundComponent from "./components/not-found/NotFoundComponent";
import EmptyRoomsPageContainer from "./containers/rooms/EmptyRoomsPageContainer";

function App() {
    return (
        <>
            <NavBarContainer/>

            <Routes>
                <Route element={<AuthLayoutComponent />}>
                    <Route path={PATH.LOGIN} element={<LoginComponent />}/>
                    <Route path={PATH.REGISTRATION} element={<RegistrationComponent />}/>
                </Route>

                <Route element={<CommonLayoutComponent/>}>
                    <Route path={PATH.ROOT} element={<MainPageContainer />}/>
                    <Route path={PATH.HOME} element={<MainPageContainer />}/>
                    <Route path={PATH.BOOKING} element={<BookingContainer />}/>
                    <Route path={PATH.USERS + '/:id'} element={<UserPageContainer />}/>
                    <Route path={PATH.EVENTS + '/:id'} element={<EventOverviewContainer />}/>
                    <Route path={PATH.MY_EVENTS} element={<UserEventsContainer />}/>
                    <Route path={PATH.FREE_ROOMS} element={<EmptyRoomsPageContainer />}/>
                </Route>

                <Route path={PATH.NOT_FOUND} element={<NotFoundComponent/>}/>
            </Routes>
        </>
    );
}

export default App;
