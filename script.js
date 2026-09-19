const input = document.getElementById("wish-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("wish-list");
const emptyMsg = document.getElementById("empty-msg");

function loadWishes() {
    try {
        return JSON.parse(localStorage.getItem("wishes")) || [];
    } catch {
        return [];
    }
}

let wishes = loadWishes();

function saveWishes() {
    localStorage.setItem("wishes", JSON.stringify(wishes));
}

function render() {
    list.innerHTML = "";

    wishes.forEach(function (wish, index) {
        const li = document.createElement("li");
        if (wish.done) {
            li.classList.add("done");
        }

        const label = document.createElement("label");
        label.className = "wish-label";

        const check = document.createElement("input");
        check.type = "checkbox";
        check.checked = wish.done;
        check.addEventListener("change", function () {
            wishes[index].done = check.checked;
            saveWishes();
            render();
        });

        const text = document.createElement("span");
        text.className = "wish-text";
        text.textContent = wish.text;

        label.append(check,text);

        const delBtn = document.createElement("button");
        delBtn.className = "delete-btn";
        delBtn.textContent = "delete";
        delBtn.addEventListener("click", function () {
            wishes.splice(index, 1);
            saveWishes();
            render();
        });

        li.append(label, delBtn);
        list.appendChild(li);
    });

    emptyMsg.hidden = wishes.length > 0;
}

function addWish() {
    const value = input.value.trim();
    if (value === "") {
        return;
    }

    wishes.push({ text: value, done: false});
    saveWishes();
    render();
    input.value = "";
}

addBtn.addEventListener("click", addWish);
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.isComposing) {
        addWish();
    }
});

render();
input.value = "";
