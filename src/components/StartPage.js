import {connect} from 'react-redux'
import React, {useEffect} from 'react'
import {get_running_tournaments} from '../actions/actions'
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
import StandingsTicker from './StandingsTicker'
import StandingsTable from './StandingsTable'
import './start.css'
  


  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  

function renderLinks(tlist) {
    console.log(tlist)
    

    if(typeof tlist === 'undefined' || tlist.length === 0) return (<ul><li>No tournament are running</li></ul>)
    
    
    const links = tlist.map((tinfo) => {
        const {tournamentName, site, tournmaentId, uniqueId} = tinfo
        const href1="/?uid=" + uniqueId + '&widgetType=' + 'ticker'
        const href2="/?uid=" + uniqueId + '&widgetType=table'
        return (
            <ul>
            <li>
            <span>{tournamentName} ({site}): ( <Link to={href1}> Ticker</Link> | <Link to={href2}>Table</Link> )</span>
           </li>
           </ul>
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
        const widgetType = query.get('widgetType')
        if(uid) {
            if(widgetType === 'ticker') {
                return (
                    <div style={{backgroundColor: '#3b3a39'}}>
                    <StandingsTicker uid={uid}/>
                    </div>
                )
            }
            else if(widgetType === 'table') {
                return (
                    <StandingsTable uid={uid} />
                )

            }

            else {
                return (
                    <div>Invalid widget or tournament id</div>
                )
            }

            
            
            
        }
        else {
        return (
            <div className="tournament-list-wrapper">
                Pick a tournament and click the corresponding link to see the overlay.  Add a browser source in OBS studio, copy the link as the source URL.
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