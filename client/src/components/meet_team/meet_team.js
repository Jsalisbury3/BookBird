import React, { Component, Fragment } from 'react';
import "./meetTeam.css";
import Jordan from './images/small-person.jpg';
import Quy from './images/quyquy.JPG'
import Kuroash from './images/kuroash.jpg'
import github from './images/github.png'
import linkedIn from './images/linkdin.png'

class Team extends Component {

    teamMembers = () => {
        const teamMembersInfo = [
            {
                Name: 'Jordan Salisbury',
                Title: 'Project Lead',
                LinkedIn: 'https://www.linkedin.com/in/jordansalisbury',
                Github: 'https://github.com/Jsalisbury3',
                Portfolio: 'https://jordansalisbury.me',
                Photo: Quy,
            },
            {
                Name: 'Justen Quirante',
                Title: 'Back-End Developer',
                LinkedIn: '',
                Github: '',
                Portfolio: '',
                Photo: Quy,
            },
            {
                Name: 'Kuroash Esmaili',
                Title: 'Front-End Developer',
                LinkedIn: 'https://www.linkedin.com/in/kuroash/',
                Github: 'https://github.com/Kur0a5h',
                Portfolio: 'https://www.kuroash.com/',
                Photo: Kuroash,
            },
            {
                Name: 'Michael Capobianco',
                Title: 'Full-Stack Developer',
                LinkedIn: '',
                Github: '',
                Portfolio: '',
                Photo: Quy,
            },
            {
                Name: 'Quy Truong',
                Title: 'Front-End Developer',
                LinkedIn: 'https://www.linkedin.com/in/quyminhtruong/',
                Github: 'https://github.com/QuyQuy',
                Portfolio: 'http://quyminhtruong.info/',
                Photo: Quy,
            },
            {
                Name: 'Cody Miller',
                Title: 'Project Manager',
                LinkedIn: 'https://www.linkedin.com/in/quyminhtruong/',
                Github: 'https://github.com/QuyQuy',
                Portfolio: 'http://quyminhtruong.info/',
                Photo: Quy,
            },
        ]
        const individualRow = teamMembersInfo.map((memberInfo, index) => {
            
            const {LinkedIn, Portfolio, Title, Photo, Name, Github} = memberInfo
            return (
                <div key={index} className="teamContainer col s12 m6 l4">
                    
                    <div className="card">
                        <div className="card-image center-align">
                            <img className={"personImg"} src={Photo}/>
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                <h2 className="teamMemberName center-align">{Name}</h2>
                                <div className="memberTitle row center-align">{Title}</div>
                                <div className="socialsContainer card-action">
                                    <div className="socialIcon"><a href={LinkedIn} target="_blank"><img className="icon" src={linkedIn}/></a></div>
                                    <div className="socialIcon"><a href={Github} target="_blank"><img className="icon" src={github}/></a></div>
                                    <div className="portfolio"><a className="portfolioText"   href={Portfolio} target="_blank">Portfolio</a></div>
                                </div>                                                            
                            </div> 
                        </div>
                    </div>
                </div>
            )
           
        }) 
        return individualRow
    }

    render() {
        return(
            <Fragment>
                <div className="bookBirdTeamMembersPage">
                    <div className="teamPageTitle">BOOKBIRD Crew</div>
                    <div className="row">
                        {this.teamMembers()}
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default Team