export default function updateScroll () {
    const lastMessageEl = document.querySelector("#container")?.lastElementChild;
    lastMessageEl?.scrollIntoView({ behavior: "smooth"});
}
