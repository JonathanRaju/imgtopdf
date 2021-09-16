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
    this.fileObj.push(e.target.files[0]);
    
    console.warn(this.fileObj[0])
    // console.warn(e.target.files.name)
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
      this.fileName.push(this.fileObj[0][i].name)
    }
    this.fileObj=[]
    this.setState({ file: this.fileArray });
    this.setState({name:this.fileName})
    console.warn(this.fileArray)
    console.warn(this.state.file)
    
    
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
        <div className="form-group multi-preview" style={{border:"2px solid black", height:"500px", width:"1"}}>
          {(this.state.file ).map((url) => (
            <img src={url} alt="..." style={{width:"200px", height:"150px", padding:"10px"}} />
          ))}
        </div>
        <form>
          <div className="form-group">
            <input
              type="file"
              className="form-control"
              onChange={this.uploadMultipleFiles}       
            />
            <input
              type="file"
              className="form-control"
              onChange={this.uploadMultipleFiles}       
            />
            <input
              type="file"
              className="form-control"
              onChange={this.uploadMultipleFiles}       
            />
            <input
              type="file"
              className="form-control"
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
