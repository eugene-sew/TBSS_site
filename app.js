const search = document.getElementById("search");
const matchList = document.getElementById("matchlist");
const searchbtn = document.getElementById("search-btn");

//search and filter books
const searchBooks = async (searchText) => {
  const result = await fetch("./TBSSGh (copyforCsv).json");
  const books = await result.json();

  //get the match
  let matches = books.filter((book) => {
    regex = new RegExp(`^${searchText}`, "gi");
    return book.TITLE.match(regex) || book.Author.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

//showing results in html
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
     <ul class="list-group">
       <li class="list-group-item"><b>${match.TITLE}</b><br>Author(s):${match.Author}</li> 
       </ul>
        `
      )
      .join("");
    console.log(html);
    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => search.value);
searchbtn.addEventListener("click", () => searchBooks(search.value));
