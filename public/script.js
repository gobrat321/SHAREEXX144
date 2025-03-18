// Toggle light/dark mode
function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const modeIcon = document.querySelector('.mode-switch');
    modeIcon.textContent = document.body.classList.contains('dark-mode') ? '🌕' : '🌙';
}

async function submitForm(event) {
    event.preventDefault();
    const result = document.getElementById('result');
    const button = document.getElementById('submit-button');
    
    try {
        result.style.display = 'block';
        result.className = 'result';
        result.innerHTML = 'Processing...';
        button.disabled = true;

        const response = await fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify({
                cookie: document.getElementById('cookies').value,
                url: document.getElementById('urls').value,
                amount: document.getElementById('amounts').value,
                interval: document.getElementById('intervals').value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (data.status === 200) {
            result.classList.add('success');
            result.innerHTML = 'Submitted successfully!';
        } else {
            result.classList.add('error');
            result.innerHTML = 'Error: ' + data.error;
        }
    } catch (e) {
        console.error(e);
        result.classList.add('error');
        result.innerHTML = 'An unexpected error occurred.';
    } finally {
        button.disabled = false;
    }
}

// Function to update date and time in GMT+8
function updateDateTime() {
    const now = new Date();
    const options = { 
        timeZone: 'Asia/Singapore', 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);
    document.getElementById('date-time').textContent = formattedDate + " (GMT+8)";
}

// Update date and time every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Initialize immediately