async function getData() {
    let URL = 'https://dummyjson.com/products'
    let user = await fetch(URL)
    let response = await user.json()
    console.log(response);
    
}
getData()