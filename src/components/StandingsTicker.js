import React, {useEffect,useState} from 'react'
import Ticker from 'react-ticker'
import axios from 'axios'
import './ticker.css'


async function makeAPICall(uid) {
    const uri = 'https://api.cornblaster.com/pokerdata/running/' + uid
    const response = await axios.get(uri)
    return response.data
}

const generateElements = ((data) => {
    let i = 0
    console.log("DATA IS")
    console.log(data)
    
    const players = data.players.map((d) => {
        console.log("d is ", d)
        i = i + 1   
        if(d.chips > 0) { 
            return  (
            <div className="wrapper-data">
                <p className="ticker-data">{i}.</p>
                <p className="ticker-data">{d.playerName}:</p>
                <p className="ticker-data">{d.chips}</p>
            </div>
            )
        }
        else {
            console.log("else here")
            return (
                <div className="wrapper-data">
                <p className="ticker-data">{i}.</p>
                <p className="ticker-data">{d.playerName}:</p>
                <p className="ticker-data">Eliminated</p>
                </div>
    
            )
        }
      })
      
    
      return players
})


const StandingsData = (props) => {
    const [tourneyData, setTData] = useState("")
    const {uid,index} = props

    useEffect(() => {
        async function fetchData(uid) {
            const apiData = await makeAPICall(uid)
            console.log(apiData)
            setTData(apiData)
        }
        fetchData(uid)

    },[])

    
    let pElements = [<p className="ticker-data">hi</p> ]
    
    if(tourneyData != null && tourneyData.hasOwnProperty('players')) {
        pElements = generateElements(tourneyData)
    }
    let moddedIndex = index.index % pElements.length
    console.log("modded index: ", moddedIndex)

    return (
        <div className="wrapper-data">{pElements[moddedIndex]}</div>
    )



}




function StandingsTicker(props) {
    const {uid} = props

    
    return (
        <Ticker offset="run-in" speed={5}>
            {(index) => <StandingsData index={index} uid={uid} tData={props.tournamentData} />}
        </Ticker>
        )
    

}


export default StandingsTicker