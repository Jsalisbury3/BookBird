import React, {Component} from 'react';
import DragDrop from './images/x3KMH.jpg'
import SingleBookPhoto from './singleBookPhoto';
import './addBook.css';
import Modal from './modal';
import axios from 'axios';
import 'materialize-css';
import 'material-icons';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import {BASE_URL_GOOGLE_BOOKS, API_KEY} from '../../../../config/api';
import SearchInput from './isbn_search'
import image2 from './images/488.jpg';


class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: '',
            ISBN: '',
            condition: 'Excellent',
            title: '',
            author: '',
            edition: '',
            price: '',
            comments: '',
            subtitle:'',
            bookImage: undefined,
            books:[],
            photoArray:[],
            loaded:0,
            imgTagArray:[],
        }
    }

    componentDidMount = async() => {
        document.getElementsByClassName('modalIsbn')[0].style.display = "block";
        await this.addPhotoToMultiPhotoContainer();


    };

    closeModalIsbn() {
        document.getElementsByClassName('modalIsbn')[0].style.display = "none";
    }
   
    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    // validateInputsFields = (event) => {
    //     event.preventDefault();
    //     const test = [
    //         {
    //             element: 'input[name=ISBN]',
    //             pattern: /[0-9]{13,}/,
    //             errorMessage: "Invalid ISBN number",
    //             index: 0
    //         },
    //         {
    //             element: 'input[name=condition]',
    //             pattern: /^(New|Like New|Good|Worn|Thrashed)$/,
    //             errorMessage: "Invalid Condition Selection",
    //             index: 1
    //         },
    //         {
    //             element: 'input[name=title]',
    //             pattern: /[a-zA-Z0-9]{4,140}/,
    //             errorMessage: "Invalid Title",
    //             index: 2
    //         },
    //         {
    //             element: 'input[name=author]',
    //             pattern: /[a-zA-Z0-9]{4,140}/,
    //             errorMessage: "Invalid Author",
    //             index: 3
    //         },
    //         {
    //             element: 'input[name=edition]',
    //             pattern: /[0-9]{1,99}/,
    //             errorMessage: "Whole Numbers Only",
    //             index: 4
    //         },
    //         {
    //             element: 'input[name=price]',
    //             pattern: /[0-9]{1,4}/,
    //             errorMessage: "Whole Numbers Only",
    //             index: 5
    //         },
    //     ];
    //
    //     if(test.length === test.filter(this.validateInputAndDisplayError).length) {
    //         this.addBook();
    //     }
    // };
    //
    // validateInputAndDisplayError = (test) => {
    //     let element = test.element;
    //     if(element === "input[name=condition]") {
    //         var selected = document.getElementById("mySelect").selectedIndex;
    //         var options = document.getElementById("mySelect").options;
    //         var elementVal = options[selected].value;
    //     } else {
    //         var elementVal = document.querySelector(element).value;
    //     }
    //     console.log(elementVal);
    //     let pattern = test.pattern;
    //     let errorMessage = test.errorMessage;
    //     let index = test.index;
    //     const result = pattern.test( elementVal );
    //     if( !result ){
    //         if(element !== "input[name=condition]") {
    //             document.getElementsByClassName("error")[index].nextElementSibling.classList.remove("visible");
    //             document.querySelector(element).nextSibling.innerHTML = errorMessage;
    //         } else {
    //             document.getElementById("conditionError").innerHTML = errorMessage;
    //             document.getElementById("conditionCheckMArk").classList.remove("visible");
    //         }
    //     } else {
    //         if(element !== "input[name=condition]") {
    //             document.getElementsByClassName("error")[index].nextElementSibling.classList.add("visible");
    //             document.querySelector(element).nextSibling.innerHTML = '';
    //         } else {
    //             document.getElementById("conditionError").innerHTML = '';
    //             document.getElementById("conditionCheckMArk").classList.add("visible");
    //         }
    //
    //     }
    //
    //     document.getElementsByClassName('modalPageContainer')[0].style.display = "block";
    //     return result;
    // };

    addBook = async (event) => {
        document.getElementsByClassName('modalPageContainer')[0].style.display = "block";
        return result;
    };
    
    fileSelectedHandler = async event => {
        console.log(event.target.files[0])
        const newImage = event.target.files[0];
        await this.setState({
            photoArray: [newImage, ...this.state.photoArray]
        })
            console.log(this.state.photoArray);
            this.addPhotoToMultiPhotoContainer();
    }

    photoUploadHandler = async()=>{
        
    }
    
    addPhotoToMultiPhotoContainer = () => {
        const imgTagArray = this.state.photoArray.map((item, index) => {
            return (
                <SingleBookPhoto delete={this.deletePhotoFromStateAndContainer(index)} key={index} index={index} about={item}/>
            )
        });
        this.setState({
            imgTagArray
        });
        console.log(this.state.imgTagArray);
        return imgTagArray;
    };
    deletePhotoFromStateAndContainer = (index) => () => {
        const newPhotoArray=[...this.state.photoArray];
        const newImgTagArray=[...this.state.imgTagArray];
        const nPASplice=newPhotoArray.splice(index,1);
        const nITASplice=newImgTagArray.splice(index,1);
        console.log("11",newPhotoArray, newImgTagArray);
        this.setState({
            photoArray: newPhotoArray,
            imgTagArray: newImgTagArray
        });
        
    }
    addBook = async () => {
        // event.preventDefault();
        console.log("state:", this.state);
        let request = {...this.state};
        axios({
            method: 'post',
            url: '/api/addListing',
            headers: {token: localStorage.getItem('Token')},
            data: request,
        });
        // document.getElementsByClassName('modalPageContainer')[0].style.display = "block";
    };
    getBooks=(event)=>{
        event.preventDefault();
        axios.request({
            method: 'get',
            url: BASE_URL_GOOGLE_BOOKS +this.state.ISBN + API_KEY,
            
        }).then((response)=>{
            console.log('URL: ', BASE_URL_GOOGLE_BOOKS +"isbn:"+this.state.ISBN + API_KEY)
            this.setState({
                books: response.data.items,
                author: response.data.items[0].volumeInfo.authors[0],
                title: response.data.items[0].volumeInfo.title,
                subtitle: response.data.items[0].volumeInfo.subtitle,
                publisher: response.data.items[0].volumeInfo.publisher,
                bookImage: response.data.items[0].volumeInfo.imageLinks.smallThumbnail
            },()=>{
                console.log(this.state.books)
                console.log(`Author: ${this.state.author}`)
                console.log(`Title: ${this.state.title}`)
                console.log(`Publisher: ${this.state.publisher}`)
                console.log(`Book Image Url: ${this.state.bookImage}`)
             

            })
        }).catch((error)=>{
            console.log('Error occured', error);
        })
    }

    handleIsbnChange(event){
        this.setState({ISBN: event.target.value});
    }

    render() {
        return (
            <div className="post-book-container">
                <div id="modal1" className="modalIsbn">
                    <div className="modal-content">
                        <form onSubmit={this.getBooks}className='form-isbn'>
                            <div className = "input-field">
                                <input  className=""type="text" onChange={this.handleIsbnChange.bind(this)} name={"ISBN"} placeholder={" Enter ISBN"} value={this.state.ISBN}/>
                            </div>
                            <div className="modal-footer">
                                <div className='searchButtonContainer'>
                                    <button onClick={this.getBooks} type="button" className=' btn btn-large'>Search</button>
                                    <button onClick={this.closeModalIsbn} type="button" className=' btn btn-large'>Close</button>
                                </div>
                            <p>ISBN: {this.state.ISBN}</p>
                            <p>Author: {this.state.author}</p>
                            <p>Title: {this.state.title}</p>
                            <p>SubTitle: {this.state.subtitle}</p>
                            <p>Publisher: {this.state.publisher}</p>
                            {/* <p>BookImage: {this.state.bookImage}</p> */}
                            <img src={this.state.bookImage} alt=""/>

                            </div>
                        </form>
                    </div>
                </div>
                <form className={'form-container '} onSubmit={this.validateInputsFields} encType="multipart/form-data">
                    <div className=' title-container row'>
                        <div id={"conditionError"} className={"error"}></div>
                        <div id={"conditionCheckMArk input-field "} className={"checkMark markCondition material-icons"}>check_circle_outline</div>
                        <input name={"title"} placeholder={"*Title"} id={'input-field'} className={"inputs col s10 push-s1"} onChange={this.handleInput}/>
                    </div>
                    <div className='row'>
                        <div className={"error"}></div>
                        <div className={"checkMark markTitle material-icons"}>check_circle_outline</div>
                        <input name={"author"} placeholder={"*Author"} id={'input-field'} className={"inputs col s10 push-s1"} onChange={this.handleInput}/>
                    </div>
                    <div className='row'>
                        <div className={"error"}></div>
                        <div className={"checkMark markEdition material-icons"}>check_circle_outline</div>
                        <input name={"price"} placeholder={"*Price $$$$"} id={'input-field'} className={"inputs col s10 push-s1"} onChange={this.handleInput}/>
                    </div>
                    <div className='row'>
                        <select name={"condition"} onChange={this.handleInput} id={"mySelect"} className={"condition  col s6 push-s3"}>
                            <option value="" disabled selected>*Select Condition:</option>
                            <option value="New">New</option>
                            <option value="Like New">Like New</option>
                            <option value="Good">Good</option>
                            <option value="Worn">Worn</option>
                            <option value="Thrashed">Thrashed</option>
                        </select>
                    </div>
                    <div className={"error"}></div>
                    <div className={"checkMark markPrice material-icons"}>check_circle_outline</div>
                    <div className={'comment-text-area'}>
                        <textarea name={"comments"} placeholder={"Seller's Comments"}  id={"input-field"} className={"inputs last "} onChange={this.handleInput}/>
                    </div>



                    {/*<div className="row">*/}
                        {/*<input name={"ISBN"} placeholder={"*ISBN"} className={"inputs isbn-container col s6 offset-s6"} onChange={this.handleInput}/>*/}
                    {/*</div>*/}
                    {/* <input name={"ISBN"} placeholder={"*ISBN"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <div className={"checkMark markISBN material-icons"}>check_circle_outline</div> */}



                    {/*<div className={"error"}></div>*/}
                    {/*<div className={"checkMark markAuthor material-icons"}>check_circle_outline</div>*/}
                    {/*<input name={"edition"} placeholder={"*Edition"} className={"inputs"} onChange={this.handleInput}/>*/}


                    {/*<div className={"photo material-icons"}>add_a_photo*/}
                        {/*<input id="photo" className='upload-image' type="file" name='photo' capture="camera" accept="image/*" onChange={this.fileSelectedHandler}/>*/}
                    {/*/!*</div>*!/*/}
                    {/*<div className="upload-image-container">*/}
                     {/*<p>Tap to delete</p>*/}
                        {/*{this.state.imgTagArray}*/}
                    {/*</div>*/}
                    <button className={"POST"}>Post</button>
                </form>
            </div>
        )
                
    }
}


export default AddBook;