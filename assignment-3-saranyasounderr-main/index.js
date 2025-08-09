/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 * 
 * Name: Saranya Sounder Rajan
 * Email: sounders@oregonstate.edu
 */

/* Buttons for Sell Something */
var openButtonM = document.getElementById('sell-something-button');
var closeButtonM = document.getElementById('modal-close');
var cancelButtonM = document.getElementById('modal-cancel');
var acceptButtonM = document.getElementById('modal-accept');

var sellModal = document.getElementById('sell-something-modal');
var backDrop = document.getElementById('modal-backdrop');

var postDesc = document.getElementById('post-text-input');
var postPhoto = document.getElementById('post-photo-input');
var postPrice = document.getElementById('post-price-input');
var postCity = document.getElementById('post-city-input');
var postCondition = document.getElementsByName('post-condition');

openButtonM.addEventListener('click', openModal);
closeButtonM.addEventListener('click', closeModal);
cancelButtonM.addEventListener('click', closeModal);
acceptButtonM.addEventListener('click', acceptPost);

var postsCollection = document.getElementById('posts');
var filterButton = document.getElementById('filter-update-button');
var filterCondition = document.getElementsByName("filter-condition");
var filterCity = document.getElementById('filter-city');
var filterMinPrice = document.getElementById('filter-min-price');
var filterMaxPrice = document.getElementById('filter-max-price');
var filterText = document.getElementById('filter-text');

filterButton.addEventListener('click', filters);

function filters() {
    var posts = document.querySelectorAll('.post');

    // Reset all posts to visible before applying filters
    posts.forEach(function (post) {
        post.style.display = '';
    });

    // Apply city, condition, price, and text filters
    filterConditions(posts);
    cityFilter(posts);
    priceFilter(posts);
    textFilter(posts);
}

function cityFilter(posts) {
    var city = filterCity.value;
    if (city && city !== "0") {
        posts.forEach(function (post) {
            if (post.getAttribute("data-city") !== city) {
                post.style.display = 'none';
            }
        });
    }
}

function priceFilter(posts) {
    var minPrice = Number(filterMinPrice.value) || 0;
    var maxPrice = Number(filterMaxPrice.value) || Infinity;

    posts.forEach(function (post) {
        var postPrice = Number(post.getAttribute("data-price"));

        if (postPrice < minPrice || postPrice > maxPrice) {
            post.style.display = 'none';
        }
    });
}


function textFilter(posts) {
    var text = filterText.value.trim().toLowerCase();

    posts.forEach(function (post) {
        var postTitleElement = post.querySelector(".post-title");

        if (postTitleElement) {
            var postTitle = postTitleElement.textContent.toLowerCase();

            if (text && !postTitle.includes(text)) {
                post.style.display = 'none';
            }
        }
    });
}

function filterConditions(posts) {
    if (findingCond() != 0) {
        for (var i = 0; i < posts.length; i++) {
            if (findingCond().indexOf(posts[i].getAttribute("data-condition")) == -1) {
                posts[i].style.display = 'none';
            }
        }
    }
}

function findingCond() {
    var conditionArray = [];
    for (var i = 0; i < filterCondition.length; i++) {
        if (filterCondition[i].checked != false) {
            conditionArray.push(filterCondition[i].value);
        }
    }

    if (conditionArray.length != 0) {
        return conditionArray;
    }
    else {
        return 0;
    }
}



function openModal() {
    sellModal.style.display = 'block';
    backDrop.style.display = 'block';
}

function closeModal() {
    sellModal.style.display = 'none';
    backDrop.style.display = 'none';
    postDesc.value = "";
    postPhoto.value = "";
    postPrice.value = "";
    postCity.value = "";
    postCondition.checked = true;
}

function acceptPost() {
    if (!validateInputs()) {
        alert("Please fill out all fields before submitting.");
    } else {
        createNewPost(postDesc.value, postPhoto.value, postPrice.value, postCity.value, getCondition());
        closeModal();
    }
}
function getCondition() {
    for (var i = 0; i < postCondition.length; i++) {
        if (postCondition[i].checked == true) {
            return postCondition[i].value;
        }
    }
}

function validateInputs() {
    return (
        postDesc.value !== "" &&
        postPhoto.value !== "" &&
        postPrice.value !== "" &&
        postCity.value !== ""
    );
}

function createNewPost(desc, photo, price, city, condition) {
    var postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.setAttribute('data-price', price);
    postDiv.setAttribute('data-city', city);
    postDiv.setAttribute('data-condition', condition);

    var postContentDiv = document.createElement('div');
    postContentDiv.classList.add('post-contents');
    postDiv.appendChild(postContentDiv);

    var postImageDiv = document.createElement('div');
    postImageDiv.classList.add('post-image-container');
    postContentDiv.appendChild(postImageDiv);

    var photoElement = document.createElement('img');
    photoElement.src = photo;
    photoElement.alt = "Post Photo";
    postImageDiv.appendChild(photoElement);

    var postInfoDiv = document.createElement('div');
    postInfoDiv.classList.add('post-info-container');
    postContentDiv.appendChild(postInfoDiv);

    var link = document.createElement('a');
    link.classList.add('post-title');
    link.href = "#";
    link.textContent = desc;
    postInfoDiv.appendChild(link);

    var priceElement = document.createElement('span');
    priceElement.classList.add('post-price');
    priceElement.textContent = "$" + price;
    postInfoDiv.appendChild(priceElement);

    var cityElement = document.createElement('span');
    cityElement.classList.add('post-city');
    cityElement.textContent = "(" + city + ")";
    postInfoDiv.appendChild(cityElement);

    postsCollection.appendChild(postDiv);
}