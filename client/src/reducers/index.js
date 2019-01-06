import { combineReducers } from 'redux';
import listingReducer from './listing_reducer';
import searchBarReducer from './search_reducer';
import bookIdReducer from './book_id_reducer';

const rootReducer = combineReducers({
    listing: listingReducer,
    searchBarReducer,
    bookIdReducer
})

export default rootReducer;