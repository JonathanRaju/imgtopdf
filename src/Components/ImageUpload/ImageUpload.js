import React,{Component} from 'react';
import jsPDF from 'jspdf';
 


class ImageUpload extends Component {
  
    state = {
      files: []
    }
  
    
  
    fileSelectedHandler = (e) => {

      let fileList =e.target.files
      const fileListAsArray = [...fileList]
      this.setState({ files: URL.createObjectURL([...e.target.files]) })
      console.warn(this.state.files)
    }
    

   uploadImages = () =>{
        var doc = new jsPDF();
        var data = [...this.state.files]
        console.warn(data[0])
        alert(data.length )
        alert(data)
        
        if(!data.length) {
            alert("add some images")
        }
        
       else{
        for (var i = 0; i < data.length; i++) {
            var image = new Image()
            console.warn(data[0])
            image.src = data[i]
           var  imageName = data[i].name  
           alert(image.src)
            doc.addPage()
            // alert(this.state.files[i].name)
            doc.addImage(image.src, 'png', 15, 220, 180, 160);
            
            doc.text(imageName, 5, 5)
           
            // doc.addPage()
            
            
          }
          // doc.save('hi.pdf')
          doc.deletePage(1)
          window.open(doc.output('bloburl'))
       }
    }
    
 
  
    render() {
      return (
        
        <form>
          <div><h2>Upload images</h2></div>
          <h3>Images</h3>
          <input type="file" accept="image/png, image/jpeg"  multiple onChange={this.fileSelectedHandler} />
          
          <button onClick={this.uploadImages}>upload</button>
        </form>
      )
    }
  }

  export default ImageUpload;
