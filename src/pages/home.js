import React, { Component } from 'react'
import Header from '../components/home/header'
import SubjectCard from '../components/home/subjectCard'
import appli_sci from '../assets/appli_science.png'
import bio from '../assets/biotech.png'
import chem from '../assets/chem.png'
import chem_engg from '../assets/chem_engg.png'
import civil from '../assets/civil.png'
import cse from '../assets/cse.png'
import earthquake from '../assets/earthquake.png'
import earth_sci from '../assets/earth_sci.png'
import ece from '../assets/ece.png'
import elec from '../assets/elec.png'
import hss from '../assets/hss.png'
import '../styles/main.scss'

class Home extends Component {
    render() {
        return(
            <div>
                <Header />
                <div className='sub_list'>
                    <SubjectCard name='archi' url={bio} />
                    <SubjectCard name='appli_sci' url={appli_sci} />
                    <SubjectCard name='biotech' url={bio} />
                    <SubjectCard name='chem' url={chem} />
                    <SubjectCard name='chem_engg' url={chem_engg} />
                    <SubjectCard name='civil' url={civil} />
                    <SubjectCard name='cse' url={cse} />
                    <SubjectCard name='earthquake' url={earthquake} />
                    <SubjectCard name='earth_sci' url={earth_sci} />
                    <SubjectCard name='ece' url={ece} />
                    <SubjectCard name='elec' url={elec} />
                    <SubjectCard name='hss' url={hss} />
                    <SubjectCard name='a' url={appli_sci} />
                    <SubjectCard name='b' url={appli_sci} />
                    <SubjectCard name='c' url={bio} />
                    <SubjectCard name='d' url={chem} />
                    <SubjectCard name='e' url={appli_sci} />
                    <SubjectCard name='f' url={appli_sci} />
                    <SubjectCard name='g' url={bio} />
                    <SubjectCard name='h' url={chem} />
                </div>
            </div>
        )
    }
}

export default Home