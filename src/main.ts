// Import our custom CSS
import "./styles.scss";
import { getData } from "./api";
import { loadQuery, clickToSaveLocal, removeItem } from "./localStore";
import { news } from "./types";
export {};

//--------------DOM-------------------------
const feedContainer =
    document.querySelector<HTMLUListElement>(".newsContainer")!;
const formInput = document.querySelector<HTMLFormElement>(".form");
const input = document.querySelector<HTMLInputElement>(".form-control")!;
const mainTitle = document.querySelector<HTMLHeadingElement>(".mainTitle");
let feed: news[] = [];

const fetchandStoreApi = async () => {
    const api = `http://hn.algolia.com/api/v1/search?query=${input.value}`;
    const data = await getData(api);
    const currentUrl = window.location.href;

    feed = data.map(
        (item): news => ({
            titel: item.title,
            link: item.url,
            score: item.points,
            timeStamp: item.created_at,
            createdBy: item.author,
        })
    );

    renderData();
    console.log(feed);
};

const renderData = () => {
    feedContainer.innerHTML = feed
        .map(
            (item, index) =>
                `<li key=${index}><a href="${item.link}"> <h4>${item.titel}</h4></a> <span> Created by: ${item.createdBy}</span><span>Points: ${item.score}</span><br/><span>Date: ${item.timeStamp}</span></li>`
        )
        .join("");
};
//--------------events------------------------------

formInput!.addEventListener("click", (e) => {
    e.preventDefault();
    clickToSaveLocal(input);
    fetchandStoreApi();
});

window.addEventListener("load", () => {
    loadQuery(input);
    fetchandStoreApi();
    removeItem();
});

mainTitle?.addEventListener("click", () => {
    input.value = "";
    fetchandStoreApi();
});

fetchandStoreApi();
