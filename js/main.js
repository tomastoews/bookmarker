
document.addEventListener('DOMContentLoaded', fetchBookmarks());

document.getElementById('addSiteForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  e.preventDefault();

  var siteName = document.getElementById('inputSiteName').value;
  var siteURL = document.getElementById('inputSiteURL').value;

  if (siteName == '' && siteURL == ''){
    var inp_siteName_Parent = document.getElementById('inputSiteNameParentDiv');
    var inp_siteURL_Parent = document.getElementById('inputSiteURLParentDiv');
    inp_siteName_Parent.classList.add("error");
    inp_siteURL_Parent.classList.add("error");

  }
  else if (siteName == '') {
    var inp_siteName_Parent = document.getElementById('inputSiteNameParentDiv');
    inp_siteName_Parent.classList.add("error");
  }
  else if (siteURL == ''){
    var inp_siteURL_Parent = document.getElementById('inputSiteURLParentDiv');
    inp_siteURL_Parent.classList.add("error");
  }
  else {
    var bookmark = {
      name : siteName,
      url : siteURL
    }

    if (localStorage.getItem('bookmarks') === null){
      var bookmarks = [];
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else {
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('inputSiteName').innerHTML = "";
    document.getElementById('inputSiteURL').innerHTML = "";
  }
  fetchBookmarks();
}

function deleteBookmark(url){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for (var i = 0; i < bookmarks.length; i++){
    if (bookmarks[i].url == url){
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  var bookmarksResults = document.getElementById('bookmarks-results');
  bookmarksResults.innerHTML = '';

  if (bookmarks) {
    for (var i = 0;i < bookmarks.length; i++) {
      var siteName = bookmarks[i].name;
      var siteURL = bookmarks[i].url;
        
      bookmarksResults.innerHTML += `
        <div class="jumbotron-small">
          <h2>
            ${siteName}
            <a onclick="deleteBookmark(\'${siteURL}')" class="ui red button delete-button">Delete</a>
            <a class="ui primary button open-button" href="${siteURL}" target="_blank">Open</a>
          </h2>
        </div>
      `;
    }
  }
}
