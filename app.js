const container = document.getElementById("comments-container");

async function loadComments(){

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
    );

    const comments = await response.json();

    comments.slice(0,10).forEach(comment => {

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
                        method:"DELETE"
                    }
                );

                if(response.ok){
                    card.remove();
                }
            }
        );

        container.appendChild(card);
    });
}

loadComments();