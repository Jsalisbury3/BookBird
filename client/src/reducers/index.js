import { combineReducers } from 'redux';
import listingReducer from './listing_reducer';
import searchBarReducer from './search_reducer';

const rootReducer = combineReducers({
    listing: listingReducer,
    searchBarReducer,
})

export default rootReducer;