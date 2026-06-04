const container = document.getElementById("comments-container");

async function loadComments() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
    );

    const comments = await response.json();

    comments.slice(0, 10).forEach(comment => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h3>${comment.name}</h3>

            <p>
                <strong>Email:</strong>
                <span class="email">
                    ${comment.email}
                </span>
            </p>

            <p>${comment.body}</p>

            <button class="mask-btn">
                Mask Email
            </button>

            <button class="delete-btn">
                Delete
            </button>
        `;

        const deleteBtn =
            card.querySelector(".delete-btn");

        deleteBtn.addEventListener(
            "click",
            async () => {

                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/comments/${comment.id}`,
                    {
                        method: "DELETE"
                    }
                );

                if (response.ok) {
                    card.remove();
                }
            }
        );

        container.appendChild(card);
    });
}

loadComments();


const emailElement =
    card.querySelector(".email");

const maskBtn =
    card.querySelector(".mask-btn");

maskBtn.addEventListener(
    "click",
    async () => {

        const originalEmail =
            emailElement.textContent;

        const parts =
            originalEmail.split("@");

        const maskedEmail =
            parts[0] + "@*******";

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/comments/${comment.id}`,
            {
                method:"PATCH",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({
                    email:maskedEmail
                })
            }
        );

        if(response.ok){
            emailElement.textContent =
                maskedEmail;
        }
    }
);