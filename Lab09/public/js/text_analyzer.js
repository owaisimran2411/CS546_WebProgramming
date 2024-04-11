let myForm = document.getElementById('text_analyze_form');
let errorDiv = document.getElementById('error-div')

if(myForm) {
  myForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let text = document.getElementById('text_to_analyze').value
    text = text.toLowerCase().trim()
    if(text.length>0) {
      
      const output = {
        original_input: undefined,
        total_number_of_letters: undefined,
        total_number_of_non_letters: undefined,
        total_number_of_vowels: undefined,
        total_number_of_consonants: undefined,
        total_number_of_words: undefined,
        total_number_of_unique_words: undefined,
        total_number_of_long_words: undefined,
        total_number_of_shorts_words: undefined
      }

      
      errorDiv.hidden = true
      errorDiv.innerHTML = ''
      
      // variable to be reused for all processing
      let process = undefined
      // processing the original input
      output.original_input = document.getElementById('text_to_analyze').value.trim()

      // calculating total number of letters
      output.total_number_of_letters = (text.replace(/[^a-z]/gm, '').length)

      // calculating total number of non-letters
      output.total_number_of_non_letters = (text.replace(/[a-z]/gm, '').length)

      // calculating total number of vowels
      output.total_number_of_vowels = (text.replace(/[^a|e|i|o|u]/gm, '').length)

      // calculating total number of non-vowels
      output.total_number_of_consonants = output.total_number_of_letters - output.total_number_of_vowels
      
      // calculating total number of words
      const words = text.replace(/[^a-z]/gm, ' ').split(' ').filter(el => el !== '')
      output.total_number_of_words = words.length

      // calculating total number of unique words
      process = {}
      let counter = 0
      for(let word of words) {
        if(!process[word]) {
          counter += 1
          process[word] = 1
        }
      }
      output.total_number_of_unique_words = counter

      // calculating total number of long words
      output.total_number_of_long_words = (words.filter((el) => {
        if (el.length>=6) {
            return el
        } 
      }).length)

      // calculating total number of short words
      output.total_number_of_short_words = (words.filter((el) => {
        if (el.length<=3 && el.length>0) {
            return el
        } 
      }).length)
      



      // appending all the elements to output-div
      const statisticsKeyValueMap = {
        'Original Input:': 'original_input',
        'Total Number of Letters': 'total_number_of_letters',
        'Total Number of Non-Letters': 'total_number_of_non_letters',
        'Total Number of Vowels': 'total_number_of_vowels',
        'Total Number of Consonants': 'total_number_of_consonants',
        'Total Number of Words': 'total_number_of_words',
        'Total Number of Unique Words': 'total_number_of_unique_words',
        'Total Number of Long Words': 'total_number_of_long_words',
        'Total Number of Short Words': 'total_number_of_short_words',

      }

      // getting the output div
      let outputDiv = document.getElementById('text-output')
      outputDiv.hidden = false
      
      // creating the main dl tag
      let dl = document.createElement('dl')

      // loop to append all statistics in dl tag
      for(let stat in statisticsKeyValueMap) {
        console.log(stat)
        // creating dt tag as child of dl
        let dlChild_dt = document.createElement('dt')
        let dlChild_dd = document.createElement('dd')

        // adding the values to dt and dd tags
        dlChild_dt.innerHTML = stat
        dlChild_dd.innerHTML = output[statisticsKeyValueMap[stat]]

        // appending dt and dd tags as child of dl tag
        dl.appendChild(dlChild_dt)
        dl.appendChild(dlChild_dd)
      }
      console.log(dl)

      // appending the new dl object as child of output-div
      outputDiv.appendChild(dl)
      myForm.reset()
      document.getElementById('text_to_analyze').focus()

    } else {
      errorDiv.hidden = false
      errorDiv.innerHTML = "Text to Analyze is an empty string"
    }
    
  })
}
