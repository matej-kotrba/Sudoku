const observer = new IntersectionObserver(entries => {
    entries[0].target.classList.toggle('isSticked', entries[0].intersectionRatio < 1)
    entries[0].target.classList.toggle('removeActive', entries[0].intersectionRatio == 1)
}, {
    threshold: 1
})

document.addEventListener('scroll', eventScroll)

function eventScroll() {
    observer.observe(document.querySelector('h1'))
    document.removeEventListener('scroll', eventScroll)
}

function changeLeaderboards() {
    document.location.assign('/change')
}

//clip-path: polygon(100% 12%, 100% 50%, 0 100%, 0 35%);

document.addEventListener('scroll', (e) => {
    let value = (scrollY / scrollMaxY) * 50
    document.getElementById('bg').style.clipPath = `polygon(100% 12%, 100% ${50 + value}%, 0 100%, 0 35%)`
})