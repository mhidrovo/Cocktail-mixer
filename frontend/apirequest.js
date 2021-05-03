/* Connects to API and displays the appropriate elements  */
/* This is the query string that looks up an drink Object */
const obj_query = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='


/* What apiFetch does is it gets the ingredients from user input
 * It later forms the query string to pass to the helper function
 * fetchInfo. 
 * It operates in a loop through the elements array of ingredients. 
 * 
 */
function apiFetch()
        {
            var query_to_send = "";
            arr_ingredients = document.getElementsByName("ingredient1");
            for(var i = 0; i < arr_ingredients.length; i++)
            {
                if (arr_ingredients[i] != "")
                    query_to_send += "i=" + arr_ingredients[i].value
                if(i != arr_ingredients.length - 1)
                    query_to_send += "&";    
            }

            var full_query = http_path + query_to_send;
            document.getElementById('fetch_request').value = full_query;
            console.log("hello")
            fetchInfo(full_query)
        }

/* Function fetchInfo 
 * This fetches BY INGREDIENTS. 
 * NOTE: Since displaying by name, it immediately calls on helper function
 * displayJSONObject to look up the name's drink and then display its information.
 */
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
/* 
 * Does another API fetch request based on name to retrieve objects with more
 * information. 
 * Currently, it creates images based on the image source returned in each of
 * the drinks array. 
 * Run this locally with cocktail.html to see the displayed result in the 
 * console. 
 */

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