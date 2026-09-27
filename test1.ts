async function getUser() {

    let response = await fetch(
        "https://restful-booker.herokuapp.com/booking"
    );

    let data = await response.json();

    console.log(data);
}

getUser();