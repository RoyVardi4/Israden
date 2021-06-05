import axios from 'axios'

const URL = "http://localhost:5000"

export default class ServerAPI {
    static async addMarker(newMarker) {
        await axios.post(URL+"/marker", newMarker)
    }

    static async getAllMarkers() {
        return await axios.get(URL+"/marker")
                .then(res => res.data)
    }

    static async addLayer(newLayer) {
        return await axios.post(URL+'/layers', newLayer)
                        .then(res => res.data)
    }

    static async getAllLayers() {
        return await axios.get(URL+'/layers')
                        .then(res => res.data)
    }
}