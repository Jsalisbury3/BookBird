import React, {Component, Fragment} from 'react';


const images = [
    {ID: 17, url: "testing/jhgkghjg/4f4da247-0f26-4d42-ba68-cf6634457d0a", listing_id: 203, imageType: "image/jpeg"},
    {ID: 18, url: "testing/jhgkghjg/4f4da247-0f26-4d42-ba68-cf6634457d0a", listing_id: 203, imageType: "image/jpeg"},
];

class CarouselItem extends Component {
    componentDidMount() {
        
    }
    render() {
        console.log('Carousel Props: ', this.props)
        debugger;
        const userImages = this.props.images.map((item, index) => { 
            return(
                <a className="carousel-item responsive-img" key={index} id="book-item" href="#two!">
                    <img src={`https://s3-us-west-2.amazonaws.com/book-bird-test-bucket/${item.url}`}/>
                </a> 
            )
        });




        return (
            <Fragment>
                {userImages || ''}
            </Fragment> 
        )
    }
    
}

export default CarouselItem;