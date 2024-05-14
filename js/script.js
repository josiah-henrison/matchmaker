const closeBtns = document.getElementsByClassName("close");
const category = document.getElementById('category');
const otherCategoryLink = document.getElementById('other-category-link');
const reviewList = document.getElementById('review-list');
const city = document.getElementById('city');
const res = document.getElementById("result");

// displayed modal
let activeModal;

function closeModal() {
    if (activeModal) {
        activeModal.style.display = "none";
    }
}

function autocompleteCity(input) {
    const cityLists = ['Nowheresville, XX 00000'];
    if (!input) {
        return [];
    }
    let reg = new RegExp(input);
    return cityLists.filter((term) => {
        if (term.match(reg)) {
            return term;
        }
    })
}

function showResults(event) {
    let val = event.target.value;
    let list = '';
    let terms = autocompleteCity(val);
    terms.forEach((term) => {
        list += `<li>${term}</li>`;
    });
    res.innerHTML = `<ul>${list}</ul>`;
}

// Event listeners
// show options when zipcode is changed
city.addEventListener('keyup', showResults);
res.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        city.value = event.target.textContent;
        res.innerHTML = '';
    }
});

// show issues when category is changed
category.addEventListener('change', (event) => {
    // if category is not empty, show issues modal
    if (event.target.value) {
        activeModal = document.getElementById("issues-container");
        activeModal.style.display = 'block';
    }
});

// show lawyer rating when read review is clicked
reviewList.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        activeModal = document.getElementById("review-container");
        activeModal.style.display = 'block';
    }
});

// show other categories when click here is clicked
otherCategoryLink.addEventListener('click', (event) => {
    activeModal = document.getElementById("other-categories-container");
    activeModal.style.display = 'block';
})

// TODO nice-to-have: display other tags with text content

// generic modal event listeners
for (let elem of closeBtns) {
    elem.addEventListener('click', closeModal);
}

window.addEventListener('click', (event) => {
    if (event.target === activeModal) {
        activeModal.style.display = "none";
    }
});
