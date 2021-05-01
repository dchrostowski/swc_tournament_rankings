import {connect} from 'react-redux'
import React, {useEffect} from 'react'
import {get_running_tournaments} from '../actions/actions'
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
import StandingsTicker from './StandingsTicker'
  


  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  

function renderLinks(tlist) {
    console.log(tlist)

    if(typeof tlist === 'undefined') return null
    
    const links = tlist.map((tinfo) => {
        const {tournamentName, site, tournmaentId, uniqueId} = tinfo
        const href="/?uid=" + uniqueId
        return (
            <li>
                <a href={href}>{tournamentName} ({site})</a>
            </li>
        )

    })

    return links
}




function StartPage(props) {
    let query = useQuery()
    useEffect(() => {
        props.getRunningTournaments()
    },[])

    if(props.runningTournaments.isLoading) {
        return (
            <div className="tournament-list-wrapper">
                Loading, please wait.
            </div>
        )
    }

    else if(props.runningTournaments.isError) {
            <div className="tournament-list-wrapper">
                An error occurred: {props.runningTournaments.errorMessage}
            </div>
    }

    else {

        const uid = query.get('uid')
        if(uid) {
            return (
                <div style={{backgroundColor: '#3b3a39'}}>
                <StandingsTicker uid={uid}/>
                </div>
            )
        }
        else {
        return (
            <div className="tournament-list-wrapper">
                <ul>
                {renderLinks(props.runningTournaments.data)}
                </ul>
            </div>
            
        )
        }
    }


}

const mapStateToProps = state => ({
    runningTournaments: state.running_tournaments
})

const mapDispatchToProps = dispatch => ({
    getRunningTournaments: () => {
        dispatch(get_running_tournaments())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StartPage)