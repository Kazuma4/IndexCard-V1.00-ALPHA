document.addEventListener("DOMContentLoaded", function () {
    const form1 = document.getElementById("form1");
    const form2 = document.getElementById("form2");
    const nextButton = document.getElementById("nextButton");
    const submitButton = document.getElementById("submitButton");

    const studentIdInput = document.getElementById("studentid");
    const nameInput = document.getElementById("name");
    const courseSelect = document.getElementById("course");
    const emailInput = document.getElementById("email");
    const sectionSelect = document.getElementById("section");
    const termRadios = document.querySelectorAll('input[name="term"]');

    // Mapping of courses to their sections
    const courseSections = {
        BSIT: ["LFAUM001", "LFAUM002", "LFAUM003"],
        BSCS: ["CSM001", "CSM002", "CSM003"],
        BSIS: ["ISM001", "ISM002", "ISM003"],
        BSA: ["BSAM001", "BSAM002", "BSAM003"]
    };

    // Validate first form
    function validateFirstForm() {
        return (
            studentIdInput.value.trim() !== "" &&
            nameInput.value.trim() !== "" &&
            courseSelect.value !== ""
        );
    }

    // Validate second form
    function validateSecondForm() {
        const isTermSelected = Array.from(termRadios).some(radio => radio.checked);
        const emailValue = emailInput.value.trim();
        const isEmailValid = emailValue.includes("@");

        return (
            emailValue !== "" &&
            isEmailValid &&
            sectionSelect.value.trim() !== "" &&
            isTermSelected
        );
    }

    // Update Next button state
    function updateNextButton() {
        nextButton.disabled = !validateFirstForm();
    }

    // Update Submit button state
    function updateSubmitButton() {
        submitButton.disabled = !validateSecondForm();
    }

    // Add event listeners to first form fields
    studentIdInput.addEventListener("input", updateNextButton);
    nameInput.addEventListener("input", updateNextButton);
    courseSelect.addEventListener("change", updateNextButton);

    // Add event listeners to second form fields
    emailInput.addEventListener("input", updateSubmitButton);
    sectionSelect.addEventListener("input", updateSubmitButton);
    termRadios.forEach(radio => radio.addEventListener("change", updateSubmitButton));

    // Handle Next button click
    nextButton.addEventListener("click", function () {
        if (validateFirstForm()) {
            // Get the selected course
            const selectedCourse = courseSelect.value;

            // Clear existing sections
            sectionSelect.innerHTML = '<option value="">Select your section</option>';

            // Populate sections based on the selected course
            if (courseSections[selectedCourse]) {
                courseSections[selectedCourse].forEach(section => {
                    const option = document.createElement("option");
                    option.value = section;
                    option.textContent = section;
                    sectionSelect.appendChild(option);
                });
            }

            // Slide forms to the left
            form1.style.transform = "translateX(-100%)";
            form2.style.transform = "translateX(-100%)";

            // Add a state to the browser history
            history.pushState({ form: "form2" }, "", "#form2");
        }
    });

    // Handle browser back button
    window.addEventListener("popstate", function (event) {
        if (event.state && event.state.form === "form2") {
            // Slide forms back to the right
            form1.style.transform = "translateX(0)";
            form2.style.transform = "translateX(0)";
        }
    });

    // Handle Submit button click
    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission for demonstration
        if (validateSecondForm()) {
            alert("Form submitted successfully!"); // Replace with actual form submission logic
            location.reload();
        }
    });

    // Disable Next and Submit buttons initially
    nextButton.disabled = true;
    submitButton.disabled = true;
});