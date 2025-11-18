 
document.addEventListener("DOMContentLoaded", () => {

  const statusTag = document.querySelector(".status-badge");
  const openAllBtn = document.querySelector(".buttons-Quik-action1");
  const closeAllBtn = document.querySelector(".buttons-Quik-action2");
  const emergencyBtn = document.querySelector(".buttons-Quik-action3");
  const timeSlots = document.querySelectorAll(".slot"); 

  openAllBtn?.addEventListener("click", () => {
    statusTag.textContent = "Available";
    statusTag.style.background = "#b6f7c1";
    updateAllSlots("open");
  });

  closeAllBtn?.addEventListener("click", () => {
    statusTag.textContent = "Unavailable";
    statusTag.style.background = "#f7b6b6";
    updateAllSlots("closed");
  });

  emergencyBtn?.addEventListener("click", () => {
    statusTag.textContent = "Emergency Break";
    statusTag.style.background = "#f2c66e";
    updateAllSlots("limited");
  });

  function updateAllSlots(state) {
    timeSlots.forEach((slot) => {
      const label = slot.querySelector(".tag");
      if (state === "open") {
        slot.style.background = "#e9fff1";
        if (label) {
          label.textContent = "Open";
          label.style.color = "#28a745";
        }
      } else if (state === "limited") {
        slot.style.background = "#fff6d1";
        if (label) {
          label.textContent = "Limited";
          label.style.color = "#caa800";
        }
      } else {
        slot.style.background = "#ffe5e5";
        if (label) {
          label.textContent = "Closed";
          label.style.color = "#d63a3a";
        }
      }
    });
  }


  const limitSlider = document.getElementById("limitSlider");
  const sliderValueDisplay = document.getElementById("sliderValue");
  const limitNumber = document.getElementById("limit-number");
  const progressText = document.getElementById("progress-text");
  const patientCountElement = document.querySelector(".patient-count");
  const updateBtn = document.querySelector("#updateLimitBtn");


  limitSlider.addEventListener("input", () => {
    sliderValueDisplay.textContent = limitSlider.value;
  });


 updateBtn.addEventListener("click", () => {
  const newLimit = parseInt(limitSlider.value);
  const currentPatients = parseInt(patientCountElement.textContent);

  limitNumber.textContent = newLimit;      
  progressText.textContent = newLimit;  
  patientCountElement.textContent = currentPatients;
  const percentage = (currentPatients / newLimit) * 100;
  document.querySelector(".progress-fill").style.width = `${percentage}%`;

  alert("Daily limit updated successfully!");
});


  const appointmentCountElements = document.querySelectorAll(".appointment-count");
  appointmentCountElements.forEach((appointmentCount) => {
    let count = 0;
    const target = parseInt(appointmentCount.dataset.target) || parseInt(appointmentCount.textContent) || 3;
    const interval = setInterval(() => {
      if (count < target) {
        count++;
        appointmentCount.textContent = count;
      } else {
        clearInterval(interval);
      }
    }, 100);
  });


  const icons = document.querySelectorAll(".stats-icon");
  icons.forEach((icon) => {
    icon.addEventListener("mouseover", () => {
      icon.style.transform = "scale(1.2) rotate(10deg)";
    });
    icon.addEventListener("mouseout", () => {
      icon.style.transform = "scale(1) rotate(0deg)";
    });
  });

  const filterSelect = document.querySelector(".filter-select");
  const appointmentCards = document.querySelectorAll(".appointment-card");

  filterSelect?.addEventListener("change", () => {
    const value = filterSelect.value;
    appointmentCards.forEach((card) => {
      if (value === "Today") {
     
        card.style.display = card.dataset.date === "today" ? "flex" : "none";
      } else if (value === "This Weak" || value === "This Month") {
        card.style.display = "flex";
      }
    });
  });

const form = document.getElementById("profileForm");
if (form) {
  const Speciality = document.getElementById("speciality");
  const Clinic = document.getElementById("clinic");
  const Phone = document.getElementById("phone");
  const Email = document.getElementById("email");

  // Save original placeholders to restore later
  const originalPlaceholders = {
    speciality: Speciality.placeholder,
    clinic: Clinic.placeholder,
    phone: Phone.placeholder,
    email: Email.placeholder,
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkInputs();
  });

  // Clear error placeholder on focus
  [Speciality, Clinic, Phone, Email].forEach((input) => {
    input.addEventListener("focus", () => {
      if (input.classList.contains("error")) {
        input.placeholder = originalPlaceholders[input.id];
        input.classList.remove("error");
        input.value = ""; // clear error text if any
      }
    });
  });

  function checkInputs() {
    let errors = 0;

    if (Speciality.value.trim() === "") {
      setErrorFor(Speciality, "Speciality cannot be blank");
      errors++;
    } else {
      setSuccessFor(Speciality);
    }

    if (Clinic.value.trim() === "") {
      setErrorFor(Clinic, "Clinic/Hospital cannot be blank");
      errors++;
    } else {
      setSuccessFor(Clinic);
    }

    if (Phone.value.trim() === "") {
      setErrorFor(Phone, "Phone number cannot be blank");
      errors++;
    } else if (!isPhone(Phone.value.trim())) {
      setErrorFor(Phone, "Phone number is not valid");
      errors++;
    } else {
      setSuccessFor(Phone);
    }

    if (Email.value.trim() === "") {
      setErrorFor(Email, "Email cannot be blank");
      errors++;
    } else if (!isEmail(Email.value.trim())) {
      setErrorFor(Email, "Email is not valid");
      errors++;
    } else {
      setSuccessFor(Email);
    }

    if (errors === 0) {
      alert("Form submitted successfully!");
      // You can submit the form here if needed, or clear fields etc.
    }
  }

  function setErrorFor(input, message) {
    input.classList.add("error");
    input.value = "";
    input.placeholder = message;
  }

  function setSuccessFor(input) {
    input.classList.remove("error");
  }

  function isEmail(email) {
    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
  }

  function isPhone(phone) {
    return /^0[5-7][0-9]{8}$/.test(phone);
  }
}

  // Appointment Popup 
  const addBtn = document.getElementById("addAppointmentBtn");
  const popup = document.getElementById("addAppointmentPopup");
  const confirmBtn = document.getElementById("addAppointmentConfirm");
  const cancelBtn = document.getElementById("addAppointmentCancel");

  const firstNameInput = document.getElementById("firstNameInput");
  const lastNameInput = document.getElementById("lastNameInput");
  const idInput = document.getElementById("idInput");

  const appointmentList = document.querySelector(".appointments-container");
  const patientCountElementAll = document.querySelector(".patient-count");
  const appointmentCountElementsAll = document.querySelectorAll(".appointment-count");

  let showingAll = false;

  // Open popup
  addBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  // Close popup
  cancelBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });


  function clearInputs() {
    firstNameInput.value = "";
    lastNameInput.value = "";
    idInput.value = "";
  }

  // Show only first 3 appts
  function updateVisibleAppointments() {
    const allAppointments = appointmentList.querySelectorAll(".appointment-card");
    allAppointments.forEach((card, index) => {
      if (!showingAll) {
        card.style.display = index < 3 ? "flex" : "none";
      } else {
        card.style.display = "flex";
      }
    });
  }

  const viewAllLink = appointmentList.querySelector(".view-all a");

  function updateViewAllLinkVisibility() {
    if (appointmentList.querySelectorAll(".appointment-card").length > 3) {
      viewAllLink.style.display = "inline";
    } else {
      viewAllLink.style.display = "none";
    }
  }

  viewAllLink.addEventListener("click", (e) => {
    e.preventDefault();
    showingAll = true;
    updateVisibleAppointments();
  });

  // Press Enter to t
  document.addEventListener("keydown", (e) => {
    if (showingAll && (e.key === "Enter" || e.key === "Return")) {
      showingAll = false;
      updateVisibleAppointments();
    }
  });

  // Add new appointment 
  confirmBtn.addEventListener("click", () => {
    const first = firstNameInput.value.trim();
    const last = lastNameInput.value.trim();
    const id = idInput.value.trim();

    if (!first || !last || !id) {
      alert("Please fill all fields");
      return;
    }

    // Check if patient exists
    const existingCards = appointmentList.querySelectorAll(".appointment-card");
    for (const card of existingCards) {
      const nameEl = card.querySelector(".patient-info h3");
      const idEl = card.querySelector(".patient-info span");
      if (!nameEl || !idEl) continue;

      const existingName = nameEl.textContent.trim().toLowerCase();
      const existingIdText = idEl.textContent.trim();
      const existingId = existingIdText.replace("Patient ID: #", "").toLowerCase();

      if (
        existingName === (first + " " + last).toLowerCase() &&
        existingId === id.toLowerCase()
      ) {
        alert("This patient already exists!");
        return;
      }
    }

    // Calculate next appointment time
    let newTime = "08:00 AM";
    if (existingCards.length > 0) {
      const lastCardTimeText = existingCards[existingCards.length - 1].querySelector(
        ".appointment-details h4"
      ).textContent;
      newTime = add45MinToTime(lastCardTimeText);
    }

    // Create new card element
    const newCard = document.createElement("div");
    newCard.classList.add("appointment-card");

    newCard.innerHTML = `
      <div class="patient-info">
        <div class="patient-icon grey-bg"><i class="fa fa-user"></i></div>
        <div>
          <h3>${first} ${last}</h3>
          <p>New Appointment</p>
          <span>Patient ID: #${id}</span>
        </div>
      </div>
      <div class="appointment-details">
        <h4>${newTime}</h4>
        <p class="status pending">Pending</p>
        <div class="actions">
          <i class="fa fa-edit"></i>
          <i class="fa fa-times"></i>
        </div>
      </div>
    `;

    appointmentList.insertBefore(newCard, appointmentList.querySelector(".view-all"));

    // Update visible appointments 
    updateVisibleAppointments();
    updateViewAllLinkVisibility();

    // Close popup & clear inputs
    popup.style.display = "none";
    clearInputs();

    // Update patient counts in all relevant places
    const newCount = existingCards.length + 1;
    patientCountElementAll.textContent = newCount;
    appointmentCountElementsAll.forEach((el) => (el.textContent = newCount));

    // Update progress bar width
    const limitValue = parseInt(limitNumber.textContent);
    const percentage = (newCount / limitValue) * 100;
    document.querySelector(".progress-fill").style.width = `${percentage}%`;
  });

  // Helper: Add 45 minutes to time string 
  function add45MinToTime(timeStr) {
    let [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

    minutes += 45;
    if (minutes >= 60) {
      hours += 1;
      minutes -= 60;
    }
    if (hours >= 24) hours -= 24;

    let newModifier = "AM";
    if (hours >= 12) {
      newModifier = "PM";
      if (hours > 12) hours -= 12;
    }
    if (hours === 0) hours = 12;

    let hoursStr = hours < 10 ? "0" + hours : hours.toString();
    let minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();

    return `${hoursStr}:${minutesStr} ${newModifier}`;
  }

 

  // Use event delegation on appointment container to listen for edit and delete clicks
  appointmentList.addEventListener("click", (e) => {
   
    if (e.target.classList.contains("fa-times")) {
      const card = e.target.closest(".appointment-card");
      if (card) {
        if (confirm("Are you sure you want to delete this appointment?")) {
          card.remove();
          updatePatientCountAfterDelete();
          updateVisibleAppointments();
          updateViewAllLinkVisibility();
        }
      }
    }

    // Edit appointment
    if (e.target.classList.contains("fa-edit")) {
      const card = e.target.closest(".appointment-card");
      if (card) {
        openEditPopup(card);
      }
    }
  });

  // Update patient count and progress bar after deleting appointment
  function updatePatientCountAfterDelete() {
    const allCards = appointmentList.querySelectorAll(".appointment-card");
    const count = allCards.length;

    patientCountElementAll.textContent = count;
    appointmentCountElementsAll.forEach((el) => (el.textContent = count));

    const limitValue = parseInt(limitNumber.textContent);
    const percentage = (count / limitValue) * 100;
    document.querySelector(".progress-fill").style.width = `${percentage}%`;
  }

// Create the edit popup modal (add it dynamically)
let editPopup = document.createElement("div");
editPopup.id = "editAppointmentPopup";
editPopup.style.position = "fixed";
editPopup.style.top = "50%";
editPopup.style.left = "50%";
editPopup.style.transform = "translate(-50%, -50%)";
editPopup.style.backgroundColor = "#fff";
editPopup.style.padding = "20px";
editPopup.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
editPopup.style.zIndex = 1000;
editPopup.style.display = "none";
editPopup.style.borderRadius = "8px";
editPopup.innerHTML = `
    <h3>Edit Appointment</h3>
    <form id="editForm">
      <label>Patient Name:</label>
      <input type="text" id="editPatientName" required />
      <label>Appointment Reason:</label>
      <input type="text" id="editReason" required />
      <label>Patient ID:</label>
      <input type="text" id="editPatientID" required />
      <label>Time:</label>
      <input type="text" id="editTime" required />
      <label>Status:</label>
      <select id="editStatus" required>
        <option value="Confirmed">Confirmed</option>
        <option value="Pending">Pending</option>
      </select>
      <div class="edit-buttons">
          <button type="submit" class="edit-save-btn">Save Changes</button>
          <button type="button" id="editCancelBtn" class="edit-cancel-btn">Cancel</button>
      </div>
    </form>
`;
document.body.appendChild(editPopup);


  const editForm = document.getElementById("editForm");
  const editPatientName = document.getElementById("editPatientName");
  const editReason = document.getElementById("editReason");
  const editPatientID = document.getElementById("editPatientID");
  const editTime = document.getElementById("editTime");
  const editStatus = document.getElementById("editStatus");
  const editCancelBtn = document.getElementById("editCancelBtn");

  let currentEditingCard = null;

  function openEditPopup(card) {
    currentEditingCard = card;

    // Extract info from card
    const patientName = card.querySelector(".patient-info h3")?.textContent || "";
    const reason = card.querySelector(".patient-info p")?.textContent || "";
    const patientID = card.querySelector(".patient-info span")?.textContent.replace("Patient ID: #", "") || "";
    const time = card.querySelector(".appointment-details h4")?.textContent || "";
    const statusText = card.querySelector(".appointment-details .status")?.textContent || "";

    // Set form values
    editPatientName.value = patientName;
    editReason.value = reason;
    editPatientID.value = patientID;
    editTime.value = time;
    editStatus.value = statusText;

    // Show popup
    editPopup.style.display = "block";
  }

  editCancelBtn.addEventListener("click", () => {
    editPopup.style.display = "none";
    currentEditingCard = null;
  });

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentEditingCard) return;

    // Update card with new values
    currentEditingCard.querySelector(".patient-info h3").textContent = editPatientName.value;
    currentEditingCard.querySelector(".patient-info p").textContent = editReason.value;
    currentEditingCard.querySelector(".patient-info span").textContent = `Patient ID: #${editPatientID.value}`;
    currentEditingCard.querySelector(".appointment-details h4").textContent = editTime.value;

    const statusElem = currentEditingCard.querySelector(".appointment-details .status");
    statusElem.textContent = editStatus.value;

    statusElem.classList.remove("confirmed", "pending");
    if (editStatus.value.toLowerCase() === "confirmed") {
      statusElem.classList.add("confirmed");
    } else if (editStatus.value.toLowerCase() === "pending") {
      statusElem.classList.add("pending");
    }

    // Hide popup
    editPopup.style.display = "none";
    currentEditingCard = null;
  });

  // Close popup if clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === editPopup) {
      editPopup.style.display = "none";
      currentEditingCard = null;
    }
  });

 
  updateVisibleAppointments();
  updateViewAllLinkVisibility();
  updatePatientCountAfterDelete();

  function animateCounter(element, target) {
  let current = 0;
  const duration = 800; 
  const increment = target / (duration / 16);

  const counter = setInterval(() => {
    current += increment;

    if (current >= target) {
      current = target;
      clearInterval(counter);
    }

    element.textContent = Math.floor(current);
  }, 16);
}


});
