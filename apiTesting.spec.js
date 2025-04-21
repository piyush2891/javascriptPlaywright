const {test, expect, request} = require('@playwright/test');
const {APIRequestContext} = require('@playwright/test');

var userId;

test('get users', async ({request})=>{
    const response = await request.get('https://reqres.in/api/users?page=2')
    console.log(await response.json())
    expect(response.status()).toBe(200)
})

test('create users', async ({request})=>{
    const response = await request.post('https://reqres.in/api/users',{
                        data:{
                                "name": "Piyush",
                                "job": "Thakur"
                            },
                        headers:{
                                    "Content-Type": "application/json"
                            }    
    });
    console.log(await response.json())
    expect(response.status()).toBe(201)
    //expect(response.body()).toContain('Piyush')
    var res = await response.json();
    userId = res.id 
    
})


test('update users', async ({request})=>{
    const response = await request.put('https://reqres.in/api/users'+userId,{
        data:{
                "name": "Piyush",
                "job": "Rajput"
            },
        headers:{
                    "Content-Type": "application/json"
            }    
    });
    console.log(await response.json())
    expect(response.status()).toBe(200)
})


test('delete users', async ({request})=>{
    const response = await request.delete('https://reqres.in/api/users'+userId)
    expect(response.status()).toBe(204);
})