import { combineReducers } from 'redux';
import listingReducer from './listing_reducer';

const rootReducer = combineReducers({
    listing: listingReducer
})

export default rootReducer;