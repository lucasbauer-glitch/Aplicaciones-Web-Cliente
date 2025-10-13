
export function renderFilterOptions(container, key, title, items) {
  const section = document.createElement("section");
  const header = document.createElement("h4");
  header.textContent = title;

  const list = document.createElement("ul");
  list.classList.add(key);

  const allItem = document.createElement("li");
  allItem.classList.add("filter-item");
  const allButton = document.createElement("button");
  allButton.classList.add("filter-button");
  allButton.dataset.filter = "all";
  allButton.textContent = "Todos";
  allItem.appendChild(allButton);
  list.appendChild(allItem);

  items.forEach((value) => {
    const li = document.createElement("li");
    li.classList.add("filter-item");
    const btn = document.createElement("button");
    btn.classList.add("filter-button");
    btn.dataset.filter = value;
    btn.textContent = value;
    li.appendChild(btn);
    list.appendChild(li);
  });

  section.append(header, list);
  container.appendChild(section);
}
