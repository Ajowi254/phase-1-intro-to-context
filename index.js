// Your code here
function createEmployeeRecord(array) {
    return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
};
}

function createEmployeeRecords() {
    return employees.map(function(employee) {
        return createEmployeeRecord(employee);
      });
  }

  function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
  
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    });
  
    return employee;
  }

  function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
  
    return employee;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  //Define the wagesEarnedOnDate function
  function wagesEarnedOnDate(employeeRecord, date) {
  
  // Get the timeInEvent and timeOutEvent for the given date
  const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

  // Calculate the hours worked and multiply by the employee's rate per hour
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  const wagesEarned = hoursWorked * employeeRecord.payPerHour;

  return wagesEarned;
}
// Define the allWagesFor function
  function allWagesFor(employeeRecord) {
    const eligibleDates = employeeRecord.timeInEvents.map(event =>event.date)
    
  // Calculate the total wages earned for each date and add them together
    const payable = eligibleDates.reduce(function(memo, d){
      return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0)
  
    return payable
  }

  function calculatePayroll(employees) {
    return employees.reduce(function(memo, employee){
      return memo + allWagesFor(employee)
    }, 0)
  }
  