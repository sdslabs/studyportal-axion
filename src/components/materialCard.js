import React, {Component} from 'react'
import icon from '../assets/material_icon.svg'
import '../styles/_materialCard.scss'
import download from '../assets/download.svg'
import CustomCheckbox from '../components/customCheckbox'

class MaterialCard extends Component {
    constructor(props) {
        super(props);
        
        this.check = React.createRef();
    }

    render() {
        return(
            <div className='material'>
                <div className='material--checkbox'><CustomCheckbox border='1px solid rgba(43, 42, 40, 0.4)' /></div>
                <div className='material--info'>
                    <div className='material--icon'><img src={icon} alt='icon' /></div>
                    <div className='material--name'>Tutorial 1</div>
                    <div className='material--download'>Downloads: 2048</div>
                </div>
                <div className='material--downloadicon'><img src={download} alt='download' /></div>
                <div className='material--size'>10.5 MB</div>
                <div className='material--datemodified'>Dec 14, 2018</div>
            </div>
        )
    }
}

export default MaterialCard