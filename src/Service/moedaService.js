import axios from "axios"

export default{
    get($moeda){
        return axios.get('http://economia.awesomeapi.com.br/json/last/' + $moeda + '-BRL')
    }
}