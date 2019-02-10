import { combineReducers } from 'redux';
import listingReducer from './listing_reducer';
import searchBarReducer from './search_reducer';
import bookIdReducer from './book_id_reducer';
import signInReducer from './sign_in_reducer';
import {reducer as formReducer} from 'redux-form';
import signUpReducer from "./sign_up_reducer";
import link_tracker_reducer from "./link_tracker_reducer";

const rootReducer = combineReducers({
    form: formReducer,
    listing: listingReducer,
    searchBarReducer,
    bookIdReducer,
    signInReducer,
    signUpReducer,
    link_tracker_reducer,
})

export default rootReducer;