document.addEventListener('blur', function(e) {
    if (!e.target.matches('.food_input')) return;

    // which input field was clicked out of?
    const target_input_elem = e.target;
    const target_id = target_input_elem.id;
    const id_match_list = target_id.split("in");

    // get the text content so we can search API
    const query_phrase = target_input_elem.value;
    console.log("Input: " + query_phrase);

    // API fetch based on content of text-input
    const url = `https://nutritionix-api.p.rapidapi.com/v1_1/search/${query_phrase}?fields=item_name,nf_calories`;
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": config.api_host,
            "x-rapidapi-key": config.api_key
        }
    })
    // need .then() to get values of Promises returned
    // arrow functions to parse data
    .then(response => response.json())
    .then(responseJSON => {
        // save list of query matches
        const query_hits_arr = responseJSON['hits'];
        console.log(query_hits_arr);
        // see which match we want based on portion

        // get calorie amount and output
        let cal_amt = query_hits_arr[0]['fields']["nf_calories"];
        // round the decimal if necessary
        if (!Number.isInteger(cal_amt)) {
            cal_amt = Math.round(cal_amt);
        }
        console.log("Outputting: " + cal_amt + " Calories");
        // use id_match_list to get the correct id for output
        // const output_id = + "h3" + ;
    })
    .catch(err => {
        console.log(err);
    });
}, true);

document.addEventListener('click', function(event) {
    // If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.calc_button')) return;

    // which button # was clicked?
    const target_elem = event.target;
    const target_num = target_elem.id.split('_')[2];
    console.log("Button " + target_num + " clicked");
    
    // get the amount of calories for each item 
    const cal_list = document.getElementsByClassName("item_cal");
    let daily_cal_count = 0;

    for (let elem of cal_list) {
        // if the element matches our target button
        if (elem.id.endsWith(target_num)) {
            // parse it to get the calorie amount
            // and add the amount to the running total
            daily_cal_count += parseInt(elem.textContent);
        }
    }
    console.log(daily_cal_count);
    // output the calorie amount for specific day
    const output_heading_id = "h2" + target_num;
    console.log("outputting to: " + output_heading_id);
    let output_heading = document.getElementById(output_heading_id);
    output_heading.textContent = daily_cal_count + " Calories";
    // animate this going onto the screen
    // (grows big then small or red circle around)

    // ^^ quickfix - red circle around using boxShadow
    // NEED BOX-SHADOW TO HAVE MORE PADDING BTW TEXT

    setTimeout(function() {
        output_heading.style.boxShadow = "0 0 0 2pt red";
    }, 1250);

    setTimeout(function() {
        output_heading.style.boxShadow = "initial";
    }, 3000);
}, false); // should this be true? true=capturing
