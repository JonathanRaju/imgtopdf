import React, { Component } from "react";
// import ImageUpload from "./ImageUpload";
import jsPDF from "jspdf";


export default class ImageUpload extends Component {
  fileObj = [];
  fileArray = [];
  fileName = [];

  constructor(props) {
    super(props);
    this.state = {
     
      file: [null],
      name:[null]
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }
  // Uploading multiple files to state
  uploadMultipleFiles(e) {
    // e.preventDefault()
    this.fileObj.push(e.target.files[0]);
    console.warn(this.fileObj[0])
    this.fileArray.push(URL.createObjectURL(this.fileObj[0]));
    this.fileName.push(this.fileObj[0].name)
    console.warn(this.fileName)
    console.warn(this.fileArray)
    this.fileObj=[]
    // for (let i = 0; i < this.fileObj[0].length; i++) {
     
    //   this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    //   this.fileName.push(this.fileObj[0][i].name)
      
    // }
    
    this.setState({ file: this.fileArray});
    
    
    this.setState({name:this.fileName})
    
   
    console.warn(this.state.file)
    console.warn(this.state.name)
    
    
    // console.warn(this.fileName)
  }

  uploadFiles = (e) => {
    e.preventDefault();
    var doc = new jsPDF();
    var data = this.state.file;
    console.warn(data)
    if (!data.length) {
      alert("add some images");
    } else {
      for (var i = 0; i < data.length; i++) {
        var image = new Image();
        var text = this.state.name[i]
        image.src = data[i];
        console.warn(this.fileName)
        doc.addPage();
        doc.text(text, 20, 20);
        doc.addImage(image.src, "png", 50, 100, 100, 100);
      }
      // doc.save('hi.pdf')
      doc.deletePage(1);
      window.open(doc.output("bloburl"));
    }
  };

  render() {
    return (
      <>
        <form>
          <div>
            <input
              id = {1}
              type="file"
              
              onChange={this.uploadMultipleFiles}       
            />
            </div>
            <div>
            <input
              id = {2}
              type="file"
           
              onChange={this.uploadMultipleFiles}       
            />
            </div>
            <div>
            <input
              id = {3}
              type="file"
            
              onChange={this.uploadMultipleFiles}       
            />
            </div>
          <div>
            <input
              id = {4}
              type="file"
              
              onChange={this.uploadMultipleFiles}       
            />
          </div>
          <button
            type="button"
            className="btn btn-danger btn-block"
            onClick={this.uploadFiles}
          >
            Upload
          </button>
          </form>
      </>
    );
  }
}
