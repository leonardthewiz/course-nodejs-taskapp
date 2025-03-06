const {calculateTip,farenheitToCelsius,celsiusToFarenheit,add} = require('../src/math')

test('Should calculate total with tip',()=>{
    const total = calculateTip(10,.3)
    expect(total).toBe(13)
})

test('Should calculate total with default tip amount',()=>{
    const total = calculateTip(10)
    expect(typeof total).toBe('number')
})

test('Should convert 32F to 0C',()=>{
    const conversion = farenheitToCelsius(32)
    expect(conversion).toBe(0)
})

test('Should convert 0C to 32F',()=>{
    const conversion = celsiusToFarenheit(0)
    expect(conversion).toBe(32)
})

//Failing use case to demonstrate async functions
/* test('async test',(done)=>{
    setTimeout(()=>{
        expect(1).toBe(2)
        done
    },2000)    
}) */

test('should be two numers',(done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        done()
    })
})