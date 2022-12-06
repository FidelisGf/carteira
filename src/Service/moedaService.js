export default{
    get($moeda){
        return fetch('http://economia.awesomeapi.com.br/json/last/' + $moeda + '-BRL').then(response => response.json())
    },

    getCurrencyList() {
        return fetch('https://economia.awesomeapi.com.br/json/all').then(response => response.json())
    }
}

