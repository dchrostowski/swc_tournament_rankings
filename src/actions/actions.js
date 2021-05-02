import axios from 'axios'

import {GET_RUNNING_TOURNAMENTS, GET_TOURNAMENT_DATA} from './constants'


export function get_running_tournaments() {
    const request = axios.get('https://api.cornblaster.com/pokerdata/running')

    return {
        type: GET_RUNNING_TOURNAMENTS,
        payload: request
    }
}

export function get_tournament_data(uid) {
    const request = axios.get(`https://api.cornblaster.com/pokerdata/running/${uid}`)
    return {
        type: GET_TOURNAMENT_DATA,
        payload: request
    }
}

export function get_spo_tournament_data() {
    const request = axios.get('https://api.dev.proxycrawler.com/spo_tournament_standings')
    return {
        type: GET_TOURNAMENT_DATA,
        payload: request
    }

}


