async function sendFormData() {
  const formDataRaw = localStorage.getItem("formData");
  const selectedTarif = localStorage.getItem("selectedTarif"); // ⭐ tarifni olish

  if (!formDataRaw) {
    return;
  }

  const formDataObj = JSON.parse(formDataRaw);

  // Prepare FormData for API
  const formData = new FormData();
  formData.append("sheetName", "Lead");
  formData.append("Ism", formDataObj.Ism);
  formData.append("Telefon raqam", formDataObj.TelefonRaqam);
  formData.append("Tarif", selectedTarif); // ⭐ tarifni yuborish
  formData.append("Royhatdan o'tgan vaqti", formDataObj.SanaSoat);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyThGYlJMSiBjvNdoxousy-anpYt8wsa27m7Bxkk8q2vqN3rgPn_ih8F6ci98iqlcEFDQ/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      localStorage.removeItem("formData");
      localStorage.removeItem("selectedTarif"); // ⭐ tarifni ham tozalaymiz
    } else {
      throw new Error("API response was not ok");
    }

  } catch (error) {
    console.error("Error submitting form:", error);
    document.getElementById("errorMessage").style.display = "block";
  }
}

// Send data when page loads
window.onload = sendFormData;