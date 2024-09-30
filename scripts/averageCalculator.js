import {times, addNewDay, removeDay, updateDate, updateTime} from '../data/times.js';
import {getTimeAverage} from './utils/average.js';

renderTimesGrid();

function renderTimesGrid() {  
  let inputGridContainerHTML = '';
  let previousId;
 
  times.forEach((item) => {  
    inputGridContainerHTML += `
      <div class="input-grid">        
        <input type="date" value="${item.date}" class="date-input js-date-input" data-date-id="${item.id}">      
        <input type="number" placeholder="time" value="${item.time}" class="time-input js-time-input js-time-input-${item.id}"
        data-time-id="${item.id}">
        <div class="js-delete-confirm-container-${item.id}" data-container-id="${item.id}">
          <button class="delete-button js-delete-button" data-delete-id="${item.id}">delete</button>
        </div>        
      </div>    
    `;
   
    document.querySelector('.js-input-grid-container').innerHTML = inputGridContainerHTML;    
  }); 
  
  const timeAverageString = getTimeAverage();
  document.querySelector('.js-text-result').innerHTML = timeAverageString;
  
  setDateInputElementsEventListeners();  
  setTimeInputElementsEventListeners(previousId); 
  setDeleteButtonElementsEventListeners();
}

document.querySelector('.js-add-new-item').addEventListener('click', ()=> {  
  document.body.removeEventListener('click', clickConfirmButton);                  
  addNewDay();
  renderTimesGrid();  
});

function setDateInputElementsEventListeners() {  
  document.querySelectorAll('.js-date-input')
    .forEach((dateElement) => {
      dateElement.addEventListener('click', ()=> {                
        document.body.removeEventListener('click', clickConfirmButton);         
      });
    });  
  
  document.querySelectorAll('.js-date-input')
    .forEach((dateElement) => {
      dateElement.addEventListener('change', ()=> {
        const dateValue = dateElement.value; 
        const dateId = dateElement.dataset.dateId;        
        updateDate(dateValue, dateId);
        renderTimesGrid();                
      });
    });    
}

function setTimeInputElementsEventListeners(previousId) {
  document.querySelectorAll('.js-time-input')
    .forEach((timeElement) => {
      timeElement.addEventListener('click', (event)=> {
        event.stopPropagation();           
        
        const timeId = timeElement.dataset.timeId;         
        
        if (previousId) {
          document.querySelector(`.js-delete-confirm-container-${previousId}`)
            .innerHTML = `<button class="delete-button js-delete-button" data-delete-id="${previousId}">delete</button>`; 

          setDeleteButtonElementsEventListeners();
        } 
        
        document.querySelector(`.js-delete-confirm-container-${timeId}`)
          .innerHTML = '<button class="confirm-button js-confirm-button">confirm</button>';

        document.querySelector('.js-confirm-button')
          .addEventListener('click', () => {               
            const timeValue = timeElement.value;
            updateTime(timeValue, timeId);            
            renderTimesGrid();
            
            document.body.removeEventListener('click', clickConfirmButton);  
          });                 
        
        document.querySelector(`.js-time-input-${timeId}`)
          .addEventListener('keydown', (event) => {        
            if (event.key === 'Enter') {
              clickConfirmButton();                
            }
          }); 
          
        document.body.addEventListener('click', clickConfirmButton);    

        previousId = timeId;
      });
    });    
}

function setDeleteButtonElementsEventListeners() {
  document.querySelectorAll('.js-delete-button')
    .forEach((button) => {
      button.addEventListener('click', ()=> {  
        document.body.removeEventListener('click', clickConfirmButton);                
        const buttonId = button.dataset.deleteId;
        removeDay(buttonId);      
        renderTimesGrid();         
      });
    });  
}

function clickConfirmButton() {
  document.querySelector('.js-confirm-button').click();
}



