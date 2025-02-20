const userId = document.getElementById("userId");
const name = document.getElementById("name");
const email = document.getElementById("email");
const age = document.getElementById("age");
const phone = document.getElementById("phone");

let currentPage = 1;
let usersPerPage = 5;

populateTable();

document.getElementById("userForm").addEventListener("submit", async function(event) {
  event.preventDefault();



  const user = {
    name: name.value,
    email: email.value,
    age: age.value,
    phone: phone.value,
    createdAt: new Date().toISOString(),
    isActive: true
  };


  try {

    if(userId.value) {

        const response = await fetch(`http://lukaserver.ddns.net:81/users/${userId.value}`, {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
    
        if(!response.ok) {
            throw new Error("Update data failed");
        }

    }
    else {

        const response = await fetch('http://lukaserver.ddns.net:81/users', {
            method : 'POST',
            headers:  {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        })

        if(!response.ok) {
            throw new Error("Failed to post data");
        }
    }

    populateTable();

  } catch (error) {
    console.log("Error: ", error)
  }

  event.target.reset();


})


async function populateTable(page = 1) {
    try {
   
        const response = await fetch('http://lukaserver.ddns.net:81/users');
 
        const users = await response.json();

        const tableBody = document.querySelector("#userTable tbody");

        tableBody.innerHTML = '';

        let startIndex = (page - 1) * usersPerPage;
        let endIndex = startIndex + usersPerPage;
        let paginatedUsers = users.slice(startIndex, endIndex);

        paginatedUsers.forEach(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
             <td>${user.name}</td>
              <td>${user.email}</td>
               <td>${user.age}</td>
                <td>${user.phone}</td>
                 <td>${user.createdAt}</td>
                  <td>
                   <button onclick="editUser(${user.id})" >Edit</button>
                   <button onclick="deleteUser(${user.id})">Delete</button>
                  </td>
            `;

             tableBody.append(row);
        });


        displayPagination(users.length);

    } catch (error) {
        console.log("Error: ", error)
    }
    
}

async function editUser(userId2) {
    try {

        const response = await fetch(`http://lukaserver.ddns.net:81/users/${userId2}`)

        if(!response.ok) {
            throw new Error("Fetch data failed");
        }

        const user = await response.json();

        userId.value = user.id;
        name.value = user.name;
        email.value = user.email;
        age.value = user.age;
        phone.value = user.phone;
        
    } catch (error) {
        console.log("Error: ", error)
    }
    
}

async function deleteUser(userId) {
    
    try {
        const response = await fetch(`http://lukaserver.ddns.net:81/users/${userId}`, {
            method: "DELETE"
        });

        if(!response.ok) {
            throw new Error("Deleting data failed");            
        }

        populateTable();
        
    } catch (error) {
        console.log("Error: ", error);
    }
}

function  displayPagination(totalUsers) {

    const totalPages = Math.ceil(totalUsers/usersPerPage);

    const paginationContainer = document.getElementById("pagination");

    paginationContainer.innerHTML = '';

    for (let i = 1; i < totalPages; i++) {
        
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.disabled = i === currentPage;

        btn.addEventListener("click", function() {
            currentPage = i;
            populateTable(currentPage);
        })
        
        paginationContainer.append(btn);
    }
    
}