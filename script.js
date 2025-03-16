function showSolution(id) {
    const solution = document.getElementById(id);
    if (solution.style.display === "none") {
        solution.style.display = "block";
    } else {
        solution.style.display = "none";
    }
}
document.getElementById("comment-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting
  
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;
  
    // Display the comment
    const commentDisplay = document.createElement("div");
    commentDisplay.innerHTML = `
      <p><strong>${name}</strong> (${email}) says:</p>
      <p>${comment}</p>
      <hr>
    `;
    document.getElementById("comment-box").appendChild(commentDisplay);
  
    // Clear the form
    document.getElementById("comment-form").reset();
  });
