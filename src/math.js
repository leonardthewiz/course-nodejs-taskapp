const calculateTip = (total,tipPercent=.25)=>{
    const tip = total * tipPercent
    return total + tip
}

const farenheitToCelsius = (temp)=>{
    return (temp - 32) / 1.8
}

const celsiusToFarenheit = (temp) => {
    return (temp * 1.8) + 32
}

const add = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (a<0 || b<0){
                return reject('numbers must be non-negative')
            }
            resolve(a+b)
        },2000)
    })
}


module.exports = {
    calculateTip,
    farenheitToCelsius,
    celsiusToFarenheit,
    add
}