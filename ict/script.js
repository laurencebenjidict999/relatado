document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // View Project Alert
    const projectButtons = document.querySelectorAll(".view-project");
    projectButtons.forEach(button => {
        button.addEventListener("click", function () {
            alert("Mao Ni Siya HAHAHHAHAHA");
        });
    });
});