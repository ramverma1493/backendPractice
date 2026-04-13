let countries = {
    india:{
        capital:"new delhi",
        states:28,
        population:"1.3 billion",
        language:"hindi"
    },
    usa:{
        capital:"washington dc",
        states:50,
        population:"330 million",
        language:"english"
    },
    china:{
        capital:"beijing",
        states:34,
        population:"1.4 billion",
        language:"mandarin"
    },
    japan:{
        capital:"tokyo",
        states:47,
        population:"126 million",
        language:"japanese"
    }
}

function getCountry(req,res){
    let {country} = req.params
    let {minState, maxState} = req.query
    //console.log(minState, maxState)
    let filleredCountries = []

    for(let key in countries){
        let states = countries[key].states
        if(states >= minState && states <= maxState){
            filleredCountries.push(key)
        }
    }

    res.send({
        country:country,
        data:countries[country],
        filleredCountries:filleredCountries
    })
}

let addCountry = (req,res) => {
    let data = req.body
    console.log(data.country)
    countries[data.country] = data
    res.send(countries)
}

export {addCountry}
export {getCountry}