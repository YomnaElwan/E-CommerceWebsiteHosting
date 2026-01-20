function showCustomAlert(message, func = null) {
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('custom-alert-container');
    
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert-box');
    
    const alertMessage = document.createElement('p');
    alertMessage.classList.add('custom-alert-message');
    alertMessage.innerText = message;
  
    const closeButton = document.createElement('button');
    closeButton.innerText = 'OK';
    closeButton.classList.add('close-button');
    
    closeButton.addEventListener('click', function() {
      alertContainer.remove();
      if (func) func();
    });
  
    alertBox.appendChild(alertMessage);
    alertBox.appendChild(closeButton);
    alertContainer.appendChild(alertBox);
  
    document.body.appendChild(alertContainer);
  }
  