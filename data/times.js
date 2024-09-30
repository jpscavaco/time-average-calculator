export let times = JSON.parse(localStorage.getItem('times')) || [{
  date: '',
  time: '',
  id: crypto.randomUUID()
}];

export function addNewDay() {  
  times.push({
    date: '',
    time: '',
    id: crypto.randomUUID()
  });   

  saveToStorage();
}

export function removeDay(buttonId) {
  times.forEach((item, index) => {
    if (item.id === buttonId) {
      times.splice(index, 1); 
    }   
  }); 
  
  if (times.length === 0) {    
    times = [{
      date: '',
      time: '',
      id: crypto.randomUUID()
    }];      
  }    

  saveToStorage();
}

export function updateDate(dateValue, dateId) {  
  let matchingItem = getItem(dateId); 
  matchingItem.date = dateValue;  
  saveToStorage();  
}  

export function updateTime(timeValue, timeId) {   
  let matchingItem = getItem(timeId); 
  
  if (timeValue) {    
    timeValue = Number(timeValue);
    matchingItem.time = timeValue.toFixed(2);    
  } else {
    matchingItem.time = timeValue;  
  }    
  
  saveToStorage();  
}

function getItem(itemId) {
  let matchingItem;
  
  times.forEach((item) => {
    if (item.id === itemId) {
      matchingItem = item;
    }   
  }); 

  return matchingItem;
}

export function saveToStorage() {
  localStorage.setItem('times', JSON.stringify(times));  
}
