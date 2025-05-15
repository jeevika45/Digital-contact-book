function addContact() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (name === "" || phone === "" || email === "") {
    alert("Please fill all fields.");
    return;
  }

  const contactList = document.getElementById("contact-list");
  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

  li.innerHTML = `${name} - ${phone} - ${email} <button class="btn btn-danger btn-sm" onclick="deleteContact(this)">🗑️</button>`;
  contactList.appendChild(li);

  // Clear the input fields
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";

  // Save contact to localStorage
  saveToStorage(name, phone, email);
}

function saveToStorage(name, phone, email) {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push({ name, phone, email });
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function deleteContact(button) {
  const li = button.parentElement;
  const contactText = li.textContent.replace("🗑️", "").trim();

  // Remove contact from localStorage
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts = contacts.filter(c => `${c.name} - ${c.phone} - ${c.email}` !== contactText);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  // Remove contact from UI
  li.remove();
}

// Load contacts from localStorage on page load
window.onload = function () {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.forEach(contact => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.innerHTML = `${contact.name} - ${contact.phone} - ${contact.email} <button class="btn btn-danger btn-sm" onclick="deleteContact(this)">🗑️</button>`;
    document.getElementById("contact-list").appendChild(li);
  });
};
