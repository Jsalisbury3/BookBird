import React, {Component} from 'react';
import DragDrop from './images/x3KMH.jpg'
import SingleBookPhoto from './singleBookPhoto';
import './addBook.css';
import Modal from './modal';
import axios from 'axios';
import 'materialize-css';
import 'material-icons';

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
            photoArray:[],
            loaded:0,
            imgTagArray:[],
        }
    }

    componentDidMount = async() => {
        await this.addPhotoToMultiPhotoContainer();

    };
    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    validateInputsFields = (event) => {
        event.preventDefault();
        const test = [
            {
                element: 'input[name=ISBN]',
                pattern: /[0-9]{13,}/,
                errorMessage: "Invalid ISBN number",
                index: 0
            },
            {
                element: 'input[name=condition]',
                pattern: /^(New|Like New|Good|Worn|Thrashed)$/,
                errorMessage: "Invalid Condition Selection",
                index: 1
            },
            {
                element: 'input[name=title]',
                pattern: /[a-zA-Z0-9]{4,140}/,
                errorMessage: "Invalid Title",
                index: 2
            },
            {
                element: 'input[name=author]',
                pattern: /[a-zA-Z0-9]{4,140}/,
                errorMessage: "Invalid Author",
                index: 3
            },
            {
                element: 'input[name=edition]',
                pattern: /[0-9]{1,99}/,
                errorMessage: "Whole Numbers Only",
                index: 4
            },
            {
                element: 'input[name=price]',
                pattern: /[0-9]{1,4}/,
                errorMessage: "Whole Numbers Only",
                index: 5
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
            data: request,
        });
        
        // document.getElementsByClassName('modalPageContainer')[0].style.display = "block";
    };

    render() {
        return (
            <div className={"container"}>
                <form onSubmit={this.validateInputsFields} encType="multipart/form-data" >
                    {/* <input name={"ISBN"} placeholder={"*ISBN"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <div className={"checkMark markISBN material-icons"}>check_circle_outline</div> */}
                    <select name={"condition"} onChange={this.handleInput} id={"mySelect"} className={"condition"}>
                        <option value="" disabled selected>*Select Condition:</option>
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Good">Good</option>
                        <option value="Worn">Worn</option>
                        <option value="Thrashed">Thrashed</option>
                    </select>
                    <div id={"conditionError"} className={"error"}></div>
                    <div id={"conditionCheckMArk"} className={"checkMark markCondition material-icons"}>check_circle_outline</div>
                    {/* <input name={"title"} placeholder={"*Title"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <div className={"checkMark markTitle material-icons"}>check_circle_outline</div>
                    <input name={"author"} placeholder={"*Author"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <div className={"checkMark markAuthor material-icons"}>check_circle_outline</div>
                    <input name={"edition"} placeholder={"*Edition"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <div className={"checkMark markEdition material-icons"}>check_circle_outline</div> */}
                    <input name={"price"} placeholder={"*Price $$$$"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <div className={"checkMark markPrice material-icons"}>check_circle_outline</div>
                    <textarea name={"comments"} placeholder={"Seller's Comments"} className={"inputs last"} onChange={this.handleInput}/>
                    <div className={"photo material-icons"}>add_a_photo
                        <input id="photo" type="file" name='photo' capture="camera" accept="image/*" onChange={this.fileSelectedHandler}/>
                    </div>
                    <div className="multi-photo-container">
                    {/* <p>Tap to delete</p> */}
                    {this.state.imgTagArray}
                    </div>
                    <button className={"POST"}>Post</button>
                </form>
            </div>
        )
    }
}

export default AddBook