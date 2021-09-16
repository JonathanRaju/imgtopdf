import React from 'react';

class inputImage extends React.Component {

    handleChange = () => {
        this.props.handleChange()
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleChange}/>
            </div>
        )
    }
}

export default inputImage;