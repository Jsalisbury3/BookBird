import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import "./meetTeam.css";

class MeetTeam extends Component {
    render() {
        return (
            <div className="teamPage">
                <div className={"teamHeader center"}>Book Bird Crew</div>
                <div className={"teamMembers row"}>
                    <div className={"personCard col s12 m6 l6"}>
                        <div className={"personCardImg"}>
                            <img src="IMG_0542.JPG" alt=""/>
                        </div>
                        <div className="cardContent">
                            <h2 className={"nameSection"}>name</h2>
                            <div className={"titleSection"}>title</div>
                            <div className="socials">
                                <div className={"col s4 linkedin"}>linkedin</div>
                                <div className={"col s4 github"}>github</div>
                                <div className={"col s4 portfolio"}>portfolio</div>
                            </div>
                        </div>
                    </div>

                    <div className={"personCard col s12 m6 l6"}>
                        <div className={"col s12"}>
                            <img src="" alt=""/>
                        </div>
                        <div>
                            <div className="cardContent">
                                <div className={"nameSection"}>name</div>
                                <div className={"titleSection"}>title</div>
                                <div className="socials">
                                    <div className={"col s4 linkedin"}>linkedin</div>
                                    <div className={"col s4 github"}>github</div>
                                    <div className={"col s4 portfolio"}>portfolio</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"personCard col s12 m6 l6"}>
                        <div className={"col s12"}>
                            <img src="" alt=""/>
                        </div>
                        <div>
                            <div className="cardContent">
                                <div className={"nameSection"}>name</div>
                                <div className={"titleSection"}>title</div>
                                <div className="socials">
                                    <div className={"col s4 linkedin"}>linkedin</div>
                                    <div className={"col s4 github"}>github</div>
                                    <div className={"col s4 portfolio"}>portfolio</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"personCard col s12 m6 l6"}>
                        <div className={"col s12"}>
                            <img src="" alt=""/>
                        </div>
                        <div>
                            <div className="cardContent">
                                <div className={"nameSection"}>name</div>
                                <div className={"titleSection"}>title</div>
                                <div className="socials">
                                    <div className={"col s4 linkedin"}>linkedin</div>
                                    <div className={"col s4 github"}>github</div>
                                    <div className={"col s4 portfolio"}>portfolio</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"personCard col s12 m6 l6"}>
                        <div className={"col s12"}>
                            <img src="" alt=""/>
                        </div>
                        <div>
                            <div className="cardContent">
                                <div className={"nameSection"}>name</div>
                                <div className={"titleSection"}>title</div>
                                <div className="socials">
                                    <div className={"col s4 linkedin"}>linkedin</div>
                                    <div className={"col s4 github"}>github</div>
                                    <div className={"col s4 portfolio"}>portfolio</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MeetTeam