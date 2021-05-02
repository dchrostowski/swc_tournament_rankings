
import {connect} from 'react-redux'
import React, {useEffect} from 'react'
import {get_tournament_data, get_spo_tournament_data} from '../actions/actions'
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
    maxWidth: 500,
    backgroundColor: "gray"
  },
});

function blankRows() {
  let rows = []
  for (let i=0; i<9; i++) {
    rows.push({playerName: '', chips: '', position: i+1})
  }
  return rows
}


function createTable(rows, tname, remaining, total, classes) {
    
    
    return (
      <div className="tableWrapper">
        <div className="jss155 jss157">
        <div className="jss154">

        <TableContainer  component={Paper} style={{border:3,borderStyle:'solid', borderColor:'white'}}>
        <div className="top-span"><span className={classes.table}><center><b>{tname} - {remaining}/{total} players</b></center></span></div>  
      <Table className={classes.table} aria-label="simple table">
      
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>Position</b></TableCell>
            <TableCell align="center"><b>Player</b></TableCell>
            <TableCell align="center"><b>Chips</b></TableCell>
            <TableCell align="center"><b>Winnings</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.position}>
              <TableCell align="center">
                {row.position}
              </TableCell>
              <TableCell align="center">{row.playerName}</TableCell>
              <TableCell align="center">{row.chips || "Eliminated"}</TableCell>
              <TableCell align="center">{!row.prize1 && row.chips ? "TBD" : row.totalPrize}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </div>
    )
}

function StandingsTable(props) {
    const {uid} = props
    const {tournamentData} = mapStateToProps
    useEffect(() => {

      props.getTournamentData(uid)
        try {
            setInterval(async () => {

                props.getTournamentData(uid)
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
        const blankData = blankRows()
        return (
          <div>{createTable([], "Refreshing...", 0,0, classes)}</div>
        )
    }
    else if (props.tournamentData.isError) {
        return (
            <div>{props.tournament_data.errorMessage}</div>
        )
    }

    else {
      const {data} = props.tournamentData
      if(typeof data !== "undefined" && 
        data !== null &&
        data.hasOwnProperty('players')) {
          
        const {players, tournamentName } = data
        const total = players.length
        const remaining = players.filter(player => player.chips > 0)
        return (
        <div>
         {createTable(players.splice(0,9), tournamentName, remaining.length, total, classes)}
         </div>
        )

      }
      else {
            console.log("--------------")
            console.log(props.tournamentData)
            console.log("-------------")
            return (
                <div>Tournament not running</div>
            )
      }

      }
        
    

}

const mapStateToProps = state => ({
    tournamentData: state.tournament_data
  })
  
  const mapDispatchToProps = dispatch => ({
    getTournamentData: (uid) => {
      dispatch(get_tournament_data(uid))
    }
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(StandingsTable);