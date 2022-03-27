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