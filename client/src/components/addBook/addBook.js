import React, {Component} from 'react';
import DragDrop from './images/x3KMH.jpg'
import SingleBookPhoto from './singleBookPhoto';
import './addBook.css';
import Modal from './modal';
import axios from 'axios';
import 'materialize-css';
import 'material-icons';
import {BASE_URL_GOOGLE_BOOKS, API_KEY} from '../../../../config/api';
import SearchInput from './isbn_search';
import FormData from 'form-data';
import { accessKeyId, secretAccessKey } from '../../../../config/amzns3_creds';
import image2 from './images/488.jpg';
import success from './images/successlogo.png';
import {Link} from 'react-router-dom';

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
            bookImage: undefined,
            books:[],
            photoArray:[],
            loaded:0,
            imgTagArray:[],
            imageSource: '',
            hideIsbnSearchBar: false,
            showToolTip: false
        }
    }

    componentDidMount = async () => {
        document.getElementsByClassName('modalIsbn')[0].style.display = "block";
        document.getElementsByClassName("modal-footer")[0].style.display = "none"
        document.getElementsByClassName("modal-body")[0].style.display = "none"
        document.getElementsByClassName("bookSuccessInfo")[0].style.display = "none"
        await this.addPhotoToMultiPhotoContainer();

        console.log('Tooltip:', this.tooltip);

        this.instances = M.Tooltip.init(this.tooltip);


    };

    closeModalIsbn() {
        document.getElementsByClassName('modalIsbn')[0].style.display = "none";
    }

    handleInput = (event) => {
        console.log('handle input called');
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    validateInputsFields = (event) => {
        
        event.preventDefault();
        const test = [
            // {
            //     element: 'input[name=ISBN]',
            //     pattern: /[0-9]{13,}/,
            //     errorMessage: "Invalid ISBN number",
            //     index: 0
            // },
            {
                element: 'input[name=condition]',
                pattern: /^(New|Like New|Good|Worn|Thrashed)$/,
                errorMessage: "Invalid Condition Selection",
                index: 0
            },
            // {
            //     element: 'input[name=title]',
            //     pattern: /[a-zA-Z0-9]{4,140}/,
            //     errorMessage: "Invalid Title",
            //     index: 2
            // },
            // {
            //     element: 'input[name=author]',
            //     pattern: /[a-zA-Z0-9]{4,140}/,
            //     errorMessage: "Invalid Author",
            //     index: 3
            // },
            // {
            //     element: 'input[name=edition]',
            //     pattern: /[0-9]{1,99}/,
            //     errorMessage: "Whole Numbers Only",
            //     index: 4
            // },
            {
                element: 'input[name=price]',
                pattern: /[0-9]{1,4}/,
                errorMessage: "Whole Numbers Only",
                index: 1
            },
        ];
    
        if(test.length === test.filter(this.validateInputAndDisplayError).length) {
            this.addBook();
        }
    };
    
    validateInputAndDisplayError = (test) => {
        
        let element = test.element;
        if(element === "input[name=condition]") {
            var selected = document.getElementById("mySelect").selectedIndex;
            var options = document.getElementById("mySelect").options;
            var elementVal = options[selected].value;
        } else {
            var elementVal = document.querySelector(element).value;
        }
        console.log(elementVal);
        let pattern = test.pattern;
        let errorMessage = test.errorMessage;
        let index = test.index;
        const result = pattern.test( elementVal );
        if( !result ){
            if(element !== "input[name=condition]") {
                document.getElementsByClassName("error")[index].nextElementSibling.classList.remove("visible");
                document.querySelector(element).nextSibling.innerHTML = errorMessage;
            } else {
                document.getElementById("conditionError").innerHTML = errorMessage;
                document.getElementById("conditionCheckMArk").classList.remove("visible");
            }
        } else {
            if(element !== "input[name=condition]") {
                document.getElementsByClassName("error")[index].nextElementSibling.classList.add("visible");
                document.querySelector(element).nextSibling.innerHTML = '';
            } else {
                document.getElementById("conditionError").innerHTML = '';
                document.getElementById("conditionCheckMArk").classList.add("visible");
            }
    
        }
    
        // document.getElementsByClassName('modalPageContainer')[0].style.display = "block";
        return result;
    };

    // addBook = async (event) => {
    //     document.getElementsByClassName('modalPageContainer')[0].style.display = "block";
    //     return result;
    // };
    fileSelectedHandler = async event => {
    
        const reader = new FileReader();
        console.log(event.target.files[0])
        const newImage = event.target.files[0];

        reader.onload = (event) => {
            this.setState({
                imageSource: event.target.result
            })

        }

        reader.readAsDataURL(newImage)

        await this.setState({
            photoArray: [newImage,...this.state.photoArray]
        })
        this.addPhotoToMultiPhotoContainer();
        

        // let formData = new FormData();
        // formData.append('userPhoto', event.target.files[0]);

        // axios({
        //     method: 'post',
        //     url: '/api/photo', 
        //     data: formData,
        //     config: {
        //         'headers': {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }
        // })

        // reader.onload= (e)=> {
        //     console.log('image target results', e.target)
        //     console.log('Image data', e.target.result)
        //     const formData = {
        //         file: e.target.result
        //     }

        //     axios({
        //         method: 'post',
        //         url: '/api/photo', 
        //         userPhoto: e.target.result
        //     })

            
        
    }

    photoUploadHandler = ()=>{
        this.setState({multiplePhoto: event.target.value});
    }
   

    addPhotoToMultiPhotoContainer = async () => {

        const imgTagArray = this.state.photoArray.map((item, index) => {
            return (
                <SingleBookPhoto delete={this.deletePhotoFromStateAndContainer(index)} key={index} index={index}
                                 about={item}/>
            )
        });
        await this.setState({
            imgTagArray
        });
        console.log(this.state.imgTagArray);
        return imgTagArray;
    };
    deletePhotoFromStateAndContainer = (index) => () => {
        const newPhotoArray = [...this.state.photoArray];
        const newImgTagArray = [...this.state.imgTagArray];
        const nPASplice = newPhotoArray.splice(index, 1);
        const nITASplice = newImgTagArray.splice(index, 1);
        console.log("11", newPhotoArray, newImgTagArray);
        this.setState({
            photoArray: newPhotoArray,
            imgTagArray: newImgTagArray
        });
    }

    addBook = async (event) => {
        console.log('ADD BOOK RUNNING!');
        
        console.log("state:", this.state);
        let request = {...this.state};
        console.log('Request: ', request);

        const listing = await axios({
            method: 'post',
            url: '/api/addListing',
            headers: {
                token: localStorage.getItem('Token'),
            },
            data: request,
        })

        const { insertId } = listing.data.data

        console.log('insert id:', listing)
        console.log('photo type: ', this.state.photoArray[0].type );
        // event.preventDefault();
        // let data = new FormData(this.refs.bookPost);
        // console.log('this forms', this.forms);
        // console.log('this refs', this.refs);
        const prep = await axios({
            Authorization: `AWS ${accessKeyId}: ${secretAccessKey}`,
            method: 'get',
            url: `/api/prepUpload?fileType=${this.state.photoArray[0].type}`,
            ContentType: this.state.photoArray[0].type
            
        })

        const { getUrl, key } = prep.data;

        console.log('add book key: ', key, insertId);

        // await axios(getUrl, this.state.photoArray[0], {
        //     headers: {
        //         'Content-Type': this.state.photoArray[0].type
        //     }
        // })
        let saveImageParams = {
            key,
            insertId,
            fileType: this.state.photoArray[0].type,
        }
        
        console.log('saveImage Params: ', saveImageParams);

        await axios({
            method: 'post',
            url: `/api/save-image?key=${key}&listingId=${insertId}&fileType=${this.state.photoArray[0].type}`,
            'Content-Type': 'application/json',
            headers: {
                token: localStorage.getItem('Token'),
            },
            body: saveImageParams
        })
        // const formInfo = new FormData(this.forms)
        // formInfo.append('images', this.forms[7].files[0], 'image1')
        // request.files = formInfo;
        

        // console.log('request files:', request.files)
        // console.log("state:", this.state);
        // console.log('FORM DATA: ', data);
        // data.append('data', request );
        // console.log('FORM DATA AFTER APPEND', data);

        console.log('Add Book: ', this.state);
        // 'content-type': 'multipart/form-data'
        // document.getElementsByClassName('modalPageContainer')[0].style.display = "block";
        this.bookPostedModal();
    };
    getBooks = (event) => {
        event.preventDefault();
        this.setState({hideIsbnSearchBar: true});
        axios.request({
            method: 'get',
            url: BASE_URL_GOOGLE_BOOKS + this.state.ISBN + API_KEY,

        }).then((response) => {
            this.setState({

                books: response.data.items,
                author: response.data.items[0].volumeInfo.authors[0],
                title: response.data.items[0].volumeInfo.title,
                bookImage: response.data.items[0].volumeInfo.imageLinks.smallThumbnail
            }, () => {
                document.getElementsByClassName("modal-footer")[0].style.display = "block"
                document.getElementsByClassName("modal-body")[0].style.display = "block"
            })
        }).catch((error) => {
            console.log('Error occured', error);
        })
    }

    handleIsbnChange(event) {
        this.setState({ISBN: event.target.value});
    }

    populateData = (event) => {
        event.preventDefault();
        this.setState({
            ISBN: document.getElementsByName("ModalISBN").value = `${this.state.ISBN}`,
            title: document.getElementsByName("ModalTitle").value = `${this.state.title}`,
            author: document.getElementsByName("ModalAuthor").value = `${this.state.author}`,
        })
        document.getElementsByClassName('modalIsbn')[0].style.display = "none"
        document.getElementsByName("author")[0].value = `${this.state.author}`
        document.getElementsByName("title")[0].value = `${this.state.title}`
        // document.getElementsByName("ISBN")[0].value=`${this.state.ISBN}`
    }

    clearData = (event) => {
        event.preventDefault();
        this.setState({hideIsbnSearchBar: false});
        document.getElementsByClassName("modal-footer")[0].style.display = "none"
        document.getElementsByClassName("modal-body")[0].style.display = "none"
        document.getElementsByName("ModalISBN")[0].value = " "
        this.setState({
            ISBN: '',
            author: '',
            title: ''
        })
    }

    bookPostedModal=(event)=>{
        debugger;
        document.getElementsByClassName("modalIsbn")[0].style.display = "block"
        document.getElementsByClassName("google_book_image")[0].style.display = "none"
        document.getElementsByClassName("isbnModalBookDescription")[0].style.display = "none"
        document.getElementsByClassName("submit_clear_buttons")[0].style.display = "none"
        document.getElementsByClassName("bookSuccessInfo")[0].style.display = "block"
        // document.getElementsByClassName("isbnModalContainer")[0].style.display = "block"
        // document.getElementsByClassName("modal-body")[0].style.display = "none"
        // document.getElementsByClassName("modal-footer")[0].style.display = "none"
    }


    acceptBookPosted=(event)=>{
        event.preventDefault();

    }

    render() {
        console.log('Add Book: ', this.state);
        const hideISBN = this.state.hideIsbnSearchBar ? {display: 'none'} : {display: 'block'};

        return (
            <div className={"addBook-container"}>
                <div className="isbnModalContainer">
                    <div id="modal1" className="modalIsbn">
                        <div className="modal-content">
                            <div style={hideISBN} className="isbnModalHeader">
                                <p className="isbnModalHeader">Post your book by ISBN</p>

                                <form onSubmit={this.getBooks}className='form-isbn'>
                                    <div className = "input_label input-field">
                                        <input id="isbnInput" autoComplete="off" type="text" onChange={this.handleIsbnChange.bind(this)} name={"ModalISBN"} value={this.state.ISBN}/>
                                        <p>ISBN is required <a ref={e => this.tooltip = e} className="tooltipped" data-position="top" data-tooltip="We require ISBN number to ensure accuracy of book postings">why?</a></p>
                                        <label htmlFor="isbnInput" className="enterIsbnLabel"htmlFor="ISBN">ISBN</label>
                                    </div>
                                    <div className='search_button_container'>
                                        <button onClick={this.getBooks} type="button" className='isbnSearchButton btn btn-small waves-effect'>Search</button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-body">
                                    <img className="google_book_image" src={this.state.bookImage} alt=""/>
                                    <div className="isbnModalBookDescription">
                                        <p name="ModalISBN">ISBN: {this.state.ISBN}</p>
                                        <p name="ModalAuthor">Author: {this.state.author}</p>
                                        <p name="ModalTitle">Title: {this.state.title}</p>
                                    </div>
                                    <div className="bookSuccessInfo">
                                        <p className="successModalText">Success!</p>
                                        <div className="successImage">
                                            <img src={success}/>
                                        </div>
                                        <div className="successModalButtons">
                                            <button onClick={this.clearData}type="button"className= "btn-small btn waves-effect postAgainButton">Post Again</button>
                                            <p className="btn-small btn waves-effect white"><Link to={"/"}>Accept</Link> </p>
                                        </div>  
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <form>
                                    <div className="submit_clear_buttons">
                                        <button className="accept_button btn-small btn waves-effect" type="button" onClick={this.populateData}> Accept </button>
                                        <button onClick={this.clearData} className="clear_button btn-small btn waves-effect" type="button">Try Again</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <form className={'form-container '} onSubmit={this.validateInputsFields} encType="multipart/form-data">
                    <div id='input-container' className=' title-container row'>
                        <div id={"conditionError"} className={"error"}></div>
                        <div id={"conditionCheckMArk"} className={"checkMark markCondition material-icons"}>check_circle_outline</div>
                        <div className='input-field '>
                            <input name="title"  id='title' type='text' className="inputs col s10 push-s1" onChange={this.handleInput}/>
                            <label className='label-placeholder' htmlFor='title' >Title</label>
                        </div>
                    </div>
                    <div id='input-container' className=' title-container row'>
                        <div className={"error"}></div>
                        <div className={"checkMark markTitle material-icons"}>check_circle_outline</div>
                        <div className='input-field'>
                            <input name="author" id='author' type='text' className="inputs col s10 push-s1"  onChange={this.handleInput}/>
                            <label className='label-placeholder'  htmlFor={'author'}>Author</label>
                        </div>
                    </div>
                    <div  id='input-container' className='title-container row'>
                        <div className={"error"}></div>
                        <div className={"checkMark markEdition material-icons"}>check_circle_outline</div>
                        <div className='input-field'>


                            <input name={"price"} id={'price'}  type='text' className={"inputs col s10 push-s1"} onChange={this.handleInput}/>
                            <label id='label-title' htmlFor={'price'}>*Price</label>



                        </div>
                    </div>
                    <div id='input-container condition-container' className='title-container row'>
                        <select name={"condition"} onChange={this.handleInput} id={"mySelect"}
                                className={"condition  col s6 push-s3"}>
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
                    <h5 className='sellers-comments-tag'> Sellers Comments</h5>
                    <div className={'comment-text-area'}>
                        <div  className='row'>
                        <div className='input-field'>
                        <textarea name={"comments"} id='comment-box' className={"inputs last "} onChange={this.handleInput}/>
                            <h5 className='optional-tag'>*Optional</h5>
                    </div>
                    </div>
                    </div>

                    {this.state.showToolTip && <Tooltip></Tooltip>}

                    {/*<div className="row">*/}
                    {/*<input name={"ISBN"} placeholder={"*ISBN"} className={"inputs isbn-container col s6 offset-s6"} onChange={this.handleInput}/>*/}
                    {/*</div>*/}
                    {/* <input name={"ISBN"} placeholder={"*ISBN"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <div className={"checkMark markISBN material-icons"}>check_circle_outline</div> */}
                    {/*<div className={"error"}></div>*/}
                    {/*<div className={"checkMark markAuthor material-icons"}>check_circle_outline</div>*/}
                    {/*<input name={"edition"} placeholder={"*Edition"} className={"inputs"} onChange={this.handleInput}/>*/}

                    <div className='submit-photo-container'>
                    <label  id='add-photo-icon' className="  btn waves-effect waves-light" htmlFor="photoInput"><i
                        className={"material-icons"}>add_a_photo</i></label>
                    <input id="photoInput" type="file" name="photo" capture="camera" accept="image/*"
                           onChange={this.fileSelectedHandler}/>
                    </div>
                    <div className="upload-image-container">
                        {this.state.imgTagArray}
                    </div>
                    <div className='post-button-container'>
                        <button className={"POST"}>Post</button>
                    </div>
                </form>
            </div>
        )

    }
}


export default AddBook;