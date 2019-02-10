import React, {Component} from "react";
import types from "./types";
import axios from "axios";

export const LinkTracker = (path) => dispatch => {
    try {
        dispatch({
            type: types.LINK_TRACKER,
            currentLink: path,
        })
    } catch {
        dispatch({
            type: types.LINK_TRACKER_ERROR,
            message: "unable to store link"
        })
    }
}