import axios from 'axios'

const URL = "http://localhost:5000"

export default class ServerAPI {
    static async addMarker(newMarker) {
        await axios.post(URL+"/marker", newMarker)
                // .then(res => alert(res.data))
    }
}