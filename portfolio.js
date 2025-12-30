document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message';
    messageDiv.style.cssText = `
        margin-top: 20px;
        padding: 15px;
        border-radius: 5px;
        text-align: center;
        font-weight: 500;
        display: none;
    `;
    form.appendChild(messageDiv);

    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        messageDiv.style.display = 'none';

        
        const formData = new FormData(form);

        try {
        
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // Show success message
                showMessage('Thank you! Your message has been sent successfully.', 'success');
                
                
                form.reset();
            } else {
                // Show error message
                showMessage('Oops! Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            // Show network error message
            showMessage('Network error. Please check your connection and try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    // Function to display messages
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.style.display = 'block';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        } else {
            messageDiv.style.backgroundColor = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '1px solid #f5c6cb';
        }

        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    // Real-time email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = emailInput.value;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailPattern.test(email)) {
                emailInput.style.borderColor = '#e74c3c';
                emailInput.style.outline = 'none';
            } else {
                emailInput.style.borderColor = '';
            }
        });

        emailInput.addEventListener('focus', function() {
            emailInput.style.borderColor = '';
        });
    }

    // Add name attributes to inputs if missing
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach((input, index) => {
        if (!input.name) {
            if (input.type === 'text' && index === 0) {
                input.name = 'name';
            } else if (input.type === 'email') {
                input.name = 'email';
            } else if (input.type === 'text') {
                input.name = 'subject';
            } else if (input.tagName === 'TEXTAREA') {
                input.name = 'message';
            }
    
}
            });

});