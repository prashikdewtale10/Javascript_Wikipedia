
//defining handleForm

async function handleForm(e){
    e.preventDefault();
    //getiing input value
    const inputValue = document.querySelector('.js-search-input').value ;

    // removing white or tab spaces
    const searchQuery = inputValue.trim();
    console.log(searchQuery);

    const searchResults = document.querySelector('.js-search-results');
    // Clear the previous results
    searchResults.innerHTML = '';
  
    const spinner = document.querySelector('.js-spinner');
    spinner.classList.remove('hidden')
    
    try {
        const results = await searchWiki(searchQuery);
        console.log(results);
        displayResult(results);
    } catch (error) {
        console.log(error)
        alert("Unable to Search");
        
    }finally{
        spinner.classList.add('hidden');
    }
}

// defining Searchwiki

async function searchWiki(searchQuery)
{
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);
    if(!response.ok){
        throw Error(response.statusText)
    }
    const json = await response.json();
    return json;
}

//Defining displayResults

function displayResult(results){
    const searchResults = document.querySelector('.js-search-results');
    results.query.search.forEach(result=>{
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

        searchResults.insertAdjacentHTML(
            'beforeend',
            `<div class="result-item">
              <h3 class="result-title">
                <a href="${url}" target="_blank" rel="noopener" class"title">${result.title}</a>
              </h3>
              <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
              <span class="result-snippet">${result.snippet}</span><br>
            </div>`
          );
    })
}


// targetting search form
const form = document.querySelector('.js-search-form');
console.log(form)
form.addEventListener('submit',handleForm);
