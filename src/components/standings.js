
import {connect} from 'react-redux'
import React, {useEffect} from 'react'
import {get_tournament_data} from '../actions/actions'

function getChefCatTournament(tourneyData) {
    Object.keys(tourneyData).forEach((tournamentName) => {
        let re = new RegExp(/turbo/,'i')
        if(tournamentName.match(re)) {
            return tourneyData[tournamentName]
        }
    })
}

function Standings(props) {

    useEffect(() => {
        props.getTournamentData()
    }, [])

    console.log("props.tourndata:")
    console.log(props.tournamentData)
    console.log("/props.tourndata")

    if(props.tournamentData.isLoading) {

        return (
            <div>Loading...</div>
        )
    }
    else if (props.tournamentData.isError) {
        return (
            <div>props.tournament_data.errorMessage</div>
        )
    }

    else {
        return (
            <div>{JSON.stringify(props.tournamentData.data)}</div>
        )
    }

}

const mapStateToProps = state => ({
    tournamentData: state.tournament_data
  })
  
  const mapDispatchToProps = dispatch => ({
    getTournamentData: () => {
      dispatch(get_tournament_data())
    }
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Standings);