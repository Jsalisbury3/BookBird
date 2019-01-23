import React, {Component, Fragment} from 'react';
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
import {accessKeyId, secretAccessKey} from '../../../../config/amzns3_creds';
import image2 from './images/488.jpg';
import success from './images/successlogo.png';
import {Link} from 'react-router-dom';
import {debug} from 'util';
import loadingGif from './images/loadingGif.gif'
import Header from './../universal/header'
import Nav from './../universal/nav'

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
            books: [],
            photoArray: [],
            loaded: 0,
            imgTagArray: [],
            imageSource: '',
            hideIsbnSearchBar: false,
            showToolTip: false
        }
    }

    componentDidMount = async () => {
        document.getElementsByClassName('modalIsbn')[0].style.display = "block";
        document.getElementsByClassName("modal-footer")[0].style.display = "none";
        document.getElementsByClassName("modal-body")[0].style.display = "none";
        document.getElementsByClassName("bookSuccessInfo")[0].style.display = "none";
        document.getElementsByClassName("isbnSearchErrorMessage")[0].style.display = "none";
        document.getElementById("loadingGif").style.visibility = 'hidden';
        await this.addPhotoToMultiPhotoContainer();
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
    validateIsbn = () => {
        const element = 'input[name=ModalISBN]'
        var elementVal = document.querySelector(element).value;
        const pattern = /[0-9]{10,13}/
        if (!pattern.test(elementVal)) {
            document.getElementById("loadingGif").style.visibility = 'hidden';
            console.log("error isnb:", document.getElementById("errorISBN"));
            document.getElementById("errorISBN").innerHTML = "Invalid ISBN number";
            return false
        } else {
            return true
        }
    }
    validateInputsFields = (event) => {
        console.log('HELLO THERE')
        event.preventDefault();
        const test = [
            {
                element: 'input[name=condition]',
                pattern: /^(New|Like New|Good|Worn|Thrashed)$/,
                errorMessage: "Please Select a Condition",
                index: 0
            },
            {
                element: 'input[name=price]',
                pattern: /[0-9]{1,4}/,
                errorMessage: "Whole Numbers Only",
                index: 1
            },
        ];
        if (test.length === test.filter(this.validateInputAndDisplayError).length) {
            if (localStorage.Token) {
                this.addBook();
            } else {
                this.signInRequiredModal();
            }
        }
    };
    validateInputAndDisplayError = (test) => {
        let element = test.element;
        if (element === "input[name=condition]") {
            var selected = document.getElementById("mySelect").selectedIndex;
            var options = document.getElementById("mySelect").options;
            var elementVal = options[selected].value;
        } else {
            var elementVal = document.querySelector(element).value;
        }
        let pattern = test.pattern;
        let errorMessage = test.errorMessage;
        let index = test.index;
        const result = pattern.test(elementVal);
        if (!result) {
            if (element !== "input[name=condition]") {
                document.getElementsByClassName("error")[index].nextElementSibling.classList.remove("visible");
                document.querySelector(element).nextSibling.innerHTML = errorMessage;
            } else {
                document.getElementById("conditionError").innerHTML = errorMessage;
                document.getElementById("conditionCheckMArk").classList.remove("visible");
            }
        } else {
            if (element !== "input[name=condition]") {
                document.getElementsByClassName("error")[index].nextElementSibling.classList.add("visible");
                document.querySelector(element).nextSibling.innerHTML = '';
            } else {
                document.getElementById("conditionError").innerHTML = '';
                document.getElementById("conditionCheckMArk").classList.add("visible");
            }
        }
        return result;
    };
    fileSelectedHandler = async event => {

        const reader = new FileReader();
        console.log(event.target.files[0]);
        const newImage = event.target.files[0];

        reader.onload = (event) => {
            this.setState({
                imageSource: event.target.result
            })
        }
        reader.readAsDataURL(newImage)
        await this.setState({
            photoArray: [newImage, ...this.state.photoArray]
        })
        this.addPhotoToMultiPhotoContainer();
    }
    photoUploadHandler = () => {
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
        this.bookPostedModal();
        let request = {...this.state};
        const listing = await axios({
            method: 'post',
            url: '/api/addListing',
            headers: {
                token: localStorage.getItem('Token'),
            },
            data: request,
        })
        try {
            const {insertId} = listing.data.data;
            const prep = await axios({
                Authorization: `AWS ${accessKeyId}: ${secretAccessKey}`,
                method: 'get',
                url: `/api/prepUpload?fileType=${this.state.photoArray[0].type}`,
                ContentType: this.state.photoArray[0].type

            })
            const {getUrl, key} = prep.data;

            console.log('add book key: ', key, insertId);

            await axios.put(getUrl, this.state.photoArray[0], {
                headers: {
                    'Content-Type': this.state.photoArray[0].type
                }
            })
            let saveImageParams = {
                key,
                insertId,
                fileType: this.state.photoArray[0].type,
            }
            await axios({
                method: 'post',
                url: `/api/save-image?key=${key}&listingId=${insertId}&fileType=${this.state.photoArray[0].type}`,
                'Content-Type': 'application/json',
                headers: {
                    token: localStorage.getItem('Token'),
                },
                data: saveImageParams
            })
        } catch {
            console.log("Error posting book")
        }
    };
    getBooks = (event) => {
        event.preventDefault();
        document.getElementById('loadingGif').style.visibility = 'visible';
        if (!this.validateIsbn()) {
            return
        }
        this.setState({hideIsbnSearchBar: true});
        axios.request({
            method: 'get',
            url: BASE_URL_GOOGLE_BOOKS + this.state.ISBN + API_KEY,
        }).then((response) => {
            try {
                console.log("response from getbooks api: ", response);
                this.setState({
                    books: response.data.items,
                    author: response.data.items[0].volumeInfo.authors[0],
                    title: response.data.items[0].volumeInfo.title,
                    bookImage: response.data.items[0].volumeInfo.imageLinks.smallThumbnail
                }, () => {
                    document.getElementById('loadingGif').style.visibility = 'hidden';
                    document.getElementsByClassName("isbnModalHeader")[0].style.display = "none";
                    document.getElementsByClassName("modal-footer")[0].style.display = "block";
                    document.getElementsByClassName("modal-body")[0].style.display = "block";
                    document.getElementsByClassName("google_book_image")[0].style.display = "block";
                    document.getElementsByClassName("isbnModalBookDescription")[0].style.display = "block";
                    document.getElementsByClassName("submit_clear_buttons")[0].style.display = "block";
                })
            } catch {
                console.log("error finding book info");
                document.getElementsByClassName('isbnSearchErrorMessage')[0].style.display = "block";
                this.cancelButton();
                //add the modal back to find another book here
            }
        });
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
    }
    clearData = () => {
        this.setState({hideIsbnSearchBar: false});
        document.getElementsByClassName("modal-footer")[0].style.display = "none"
        document.getElementsByClassName("modal-body")[0].style.display = "none"
        document.getElementById("errorISBN")[0].value = ""
        document.getElementsByName("ModalISBN")[0].value = " "
        this.setState({
            ISBN: '',
            author: '',
            title: ''
        })
    }
    bookPostedModal = () => {
        document.getElementById('loadingGif').style.visibility = 'hidden';
        document.getElementsByClassName("modalIsbn")[0].style.display = "block";
        document.getElementsByClassName("google_book_image")[0].style.display = "none";
        document.getElementsByClassName("isbnModalBookDescription")[0].style.display = "none";
        document.getElementsByClassName("submit_clear_buttons")[0].style.display = "none";
        document.getElementsByClassName("bookSuccessInfo")[0].style.display = "block";
    }
    signInRequiredModal = () => {
        document.getElementsByClassName("modalIsbn")[0].style.display = "block"
        document.getElementsByClassName("google_book_image")[0].style.display = "none"
        document.getElementsByClassName("isbnModalBookDescription")[0].style.display = "none"
        document.getElementsByClassName("submit_clear_buttons")[0].style.display = "none"
        document.getElementsByClassName("signInRequiredModal")[0].style.display = "block"
    }
    cancelButton = () => {
        document.getElementsByClassName("modal-footer")[0].style.display = "none";
        document.getElementsByClassName("modal-body")[0].style.display = "none";
        document.getElementsByClassName("bookSuccessInfo")[0].style.display = "none";
        document.getElementsByClassName("signInRequiredModal")[0].style.display = "none";
        document.getElementsByClassName('modalIsbn')[0].style.display = "block";
        document.getElementsByClassName('isbnModalHeader')[0].style.display = "block";
        document.getElementById("loadingGif").style.visibility = 'hidden';
        document.getElementsByName("author")[0].value = ``;
        document.getElementsByName("title")[0].value = ``;
        document.getElementsByName("price")[0].value = ``;
        document.getElementsByClassName('checkMark')[0].style.display = "none";

        this.setState({
            ISBN: '',
            photoArray: [],
            imgTagArray: [],
            price: '',
            comments: ''
        })
    }

    render() {
        const hideISBN = this.state.hideIsbnSearchBar ? {display: 'none'} : {display: 'block'};
        return (
            <Fragment>
                <Header/>
                <div className={"addBook-container"}>
                    <div className="isbnModalContainer">
                        <div id="modal1" className="modalIsbn">
                            <div className="modal-content">
                                <div style={hideISBN} className="isbnModalHeader">
                                    <p className="isbnModalHeader">Post your book by ISBN</p>
                                    <form onSubmit={this.getBooks} className='form-isbn'>
                                        <div className="input_label input-field">
                                            <input id="isbnInput" autoComplete="off" type="text"
                                                   onChange={this.handleIsbnChange.bind(this)} name={"ModalISBN"}
                                                   value={this.state.ISBN}/>
                                            <div id="errorISBN"></div>
                                            <p>ISBN is required <a ref={e => this.tooltip = e} className="tooltipped"
                                                                   data-position="top"
                                                                   data-tooltip="We require ISBN number to ensure accuracy of book postings">why?</a>
                                            </p>
                                            <label htmlFor="isbnInput" className="enterIsbnLabel">ISBN</label>
                                        </div>
                                        <div className='search_button_container'>
                                            <button onClick={this.getBooks} type="button"
                                                    className='isbnSearchButton btn btn-small waves-effect'>Search
                                            </button>
                                        </div>
                                        <p className="isbnSearchErrorMessage">Error please try again</p>
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
                                            <button onClick={this.cancelButton} type="button"
                                                    className="btn-small btn waves-effect postAgainButton">Post Again
                                            </button>
                                            <p className="btn-small btn waves-effect white"><Link to={"/landing"}>Accept</Link>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="signInRequiredModal">
                                        <p>You must be signed in to post a book</p>
                                        <Link to={"/SignIn"}><p
                                            className="btn-small btn waves-effect signInRequiredButtons"> Sign In </p>
                                        </Link>
                                        <Link to={"/SignUp"}><p
                                            className="btn-small btn waves-effect uiresignInReqdButtons"> Sign Up </p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <form>
                                        <div className="submit_clear_buttons">
                                            <button className="accept_button btn-small btn waves-effect" type="button"
                                                    onClick={this.populateData}> Accept
                                            </button>
                                            <button onClick={this.cancelButton}
                                                    className="clear_button btn-small btn waves-effect"
                                                    type="button">Try
                                                Again
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<form className={'form-container '} onSubmit={this.validateInputsFields}*/}
                    {/*encType="multipart/form-data">*/}
                    {/*<img src={loadingGif} alt="loadingGif" id="loadingGif"/>*/}
                    {/*<div id='input-container' className=' title-container row'>*/}
                    {/*<div id={"conditionError"} className={"error"}></div>*/}
                    {/*<div id={"conditionCheckMArk"}*/}
                    {/*className={"checkMark markCondition material-icons"}>check_circle_outline*/}
                    {/*</div>*/}
                    {/*<div className='input-field'>*/}
                    {/*<h6 className='input-header'>Title</h6>*/}
                    {/*<input name="title" id='title' type='text' className="inputs col s10 push-s1"*/}
                    {/*onChange={this.handleInput}/>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*<div id='input-container' className=' title-container row'>*/}
                    {/*<div className={"error"}></div>*/}
                    {/*<div className={"checkMark markTitle material-icons"}>check_circle_outline</div>*/}
                    {/*<div className='input-field'>*/}
                    {/*<h6 className='input-header'>Author</h6>*/}
                    {/*<input name="author" id='author' type='text' className="inputs col s10 push-s1"*/}
                    {/*onChange={this.handleInput}/>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*<div id='input-container' className='title-container row'>*/}
                    {/*<div className={"error"}></div>*/}
                    {/*<div className={"checkMark markEdition material-icons"}>check_circle_outline</div>*/}
                    {/*<div className='input-field'>*/}
                    {/*<input name={"price"} id={'price'} type='text' className={"inputs col s10 push-s1"}*/}
                    {/*onChange={this.handleInput}/>*/}
                    {/*<label className='label-placeholder' htmlFor={'price'}>Price</label>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</form>*/}
                    {/*</div>*/}
                    <form className={'form-container '} onSubmit={this.validateInputsFields} encType="multipart/form-data">
                        <img src={loadingGif} alt="loadingGif" id="loadingGif"/>
                        <h3 className={"pageHeader"}>Add Book</h3>
                        <p className={"pageDescription"}> Fill out the remaining fields below. This information will be displayed when other students are searching for books.</p>
                        <div id='input-container1' className=' title-container row'>
                            <div id={"titleError"} className={"error"}></div>
                            <div id={"conditionCheckMArk"}
                                 className={"checkMark markCondition material-icons"}>check_circle_outline
                            </div>
                            <div className='input-field '>
                                <h6 className='input-header first'>Title</h6>
                                <input name="title" id='title' type='text' className="inputs col s10 push-s1"
                                       onChange={this.handleInput}/>
                            </div>
                        </div>
                        <div id='input-container2' className=' title-container row'>
                            <div className={"error"} id={"authErr"}></div>
                            <div className={"checkMark markTitle material-icons"}>check_circle_outline</div>
                            <div className='input-field'>
                                <h6 className='input-header second'>Author</h6>
                                <input name="author" id='author' type='text' className="inputs col s10 push-s1"
                                       onChange={this.handleInput}/>
                            </div>
                        </div>
                        <div id='input-container3' className='title-container row'>
                            
                            <div className={"checkMark markEdition material-icons"}>check_circle_outline</div>
                            <div className='input-field'>
                                <input name={"price"} id={'price'} type='text' className={"inputs col s10 push-s1"} onChange={this.handleInput}/>
                                <div className="text-red"id={"priceErr"}></div>
                                <label className='label-placeholder' htmlFor={'price'}>Price</label>
                                
                            </div>
                        </div>
                        <div id='input-container4 condition-container' className='title-container row'>
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
                        <div id={"conditionError"}></div>
                        <div className={"checkMark markPrice material-icons"}>check_circle_outline</div>
                        <h5 name="comments" className='sellers-comments-tag'> Sellers Comments</h5>
                        <div className={'comment-text-area'}>
                            <div>
                                <div className='input-field'>
                                <textarea name={"comments"} id='comment-box' className={"inputs last "}
                                          onChange={this.handleInput}/>
                                <label htmlFor="comment-box" className="sellers-comments-tag"></label>
                                    {/* <h5 className='optional-tag'>*Optional</h5> */}
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
                            <label id="add-photo-icon picIcon" className="btn waves-effect waves-light"
                                   htmlFor="photoInput"><i
                                className={"material-icons"}>add_a_photo</i></label>
                            <input id="photoInput" type="file" name="photo" capture="camera" accept="image/*"
                                   onChange={this.fileSelectedHandler}/>
                        </div>
                        <div className="upload-image-container">
                            {this.state.imgTagArray}
                        </div>
                        <div className='post-button-container'>
                            <button type="button" onClick={this.cancelButton}
                                    className="btn-small cancelButton">Cancel
                            </button>
                            <button className="btn-small POST">Post</button>
                            {/* <button onClick={this.cancelButton} className=" btn-small btn waves-effect cancelButton">Cancel</button> */}
                        </div>
                    </form>
                </div>
                <Nav/>
            </Fragment>
        )

    }
}

export default AddBook;