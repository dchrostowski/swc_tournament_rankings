
import {connect} from 'react-redux'
import React, {useEffect} from 'react'
import {get_tournament_data} from '../actions/actions'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './table.css'

const useStyles = makeStyles({
  table: {
    maxWidth: 300,
    backgroundColor: "gray"
  },
});


function createTable(rows, classes) {
    
    return (
        <div class="jss155 jss157">
        <div class="jss154">
        <span></span>    
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"><b>Position</b></TableCell>
            <TableCell align="right"><b>Player</b></TableCell>
            <TableCell align="right"><b>Chips</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.position}>
              <TableCell align="center">
                {row.position}
              </TableCell>
              <TableCell align="right">{row.playerName}</TableCell>
              <TableCell align="right">{row.chips}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    )
}

function getChefCatTournament(tourneyData) {
    console.log(tourneyData)
    try {
        let re = new RegExp(/chefcat/,'i')
        const tournamentNames = Object.keys(tourneyData)

        for (let i=0; i<tournamentNames.length; i++) {
            console.log(tournamentNames[i])
            if (tournamentNames[i].match(re)) {
                return tourneyData[tournamentNames[i]]
            }
        }
        return null
    }
    catch(err) {
        console.log(tourneyData)
        return null
    }


    
}

function Standings(props) {

    useEffect(() => {
        try {
            setInterval(async () => {

                props.getTournamentData()
            }, 60000)

        }
        catch(e) {
            console.log(e)
        }
        
    }, [])

    console.log("props.tourndata:")
    console.log(props.tournamentData)
    console.log("/props.tourndata")
    const classes = useStyles();

    


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
        console.log("p")
        const chefcatTournamentData = getChefCatTournament(props.tournamentData.data)
        if(chefcatTournamentData === null) {
            return (
                <div><span>No ChefCat tournaments running.</span></div>
            )
        }
        else {
            return (
                <div>{createTable(chefcatTournamentData.splice(0,10),classes)}</div>
            )

        }
        
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