async function summarize() {
    const text = document.getElementById("inputText").value;
    const length = document.getElementById("length").value;
    const output = document.getElementById("output");

    if (text.trim().length < 50) {
        output.textContent = "Please enter at least 50 characters.";
        return;
    }

    output.textContent = "Summarizing…";

    try {
        const response = await fetch("http://127.0.0.1:8000/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, length })
        });

        const data = await response.json();
        output.textContent = data.summary || data.detail;
    } catch {
        output.textContent = "Unable to reach backend service.";
    }
}
