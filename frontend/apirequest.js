/* Connects to API and displays the appropriate elements  */
/* This is the query string that looks up an drink Object */
const obj_query = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='


/* What fetch info does is  */
function fetchInfo(full_query)
{
    fetch(full_query)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        
        // console.log(json);
        var string = JSON.stringify(json);
        var read_in = JSON.parse(string);
        read_in.drinks.forEach(drink => {
            // var new_img = document.createElement("img");
            // new_img.style.width = "20vh";
            // new_img.style.display = "inline-block"
            // new_img.src = drink.strDrinkThumb;
            
            displayJSONObject(drink.strDrink);
            // document.body.appendChild(new_img);
        });
    });

}


function displayJSONObject(object_name)
{
    var fetch_query = obj_query+ object_name;

    fetch(fetch_query)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        
        console.log(json);
        var string = JSON.stringify(json);
        var read_in = JSON.parse(string);
        var search_q = "";
        read_in.drinks.forEach(drink => {
            var new_img = document.createElement("img");
            new_img.style.width = "20vh";
            new_img.style.display = "inline-block"
            new_img.src = drink.strDrinkThumb;
            
            document.body.appendChild(new_img);
        });
    });
    
}

// var Image = function()
// {
//     const img = {};

// }