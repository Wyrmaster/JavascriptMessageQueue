const h1Element = document.getElementById('target');

let running = true;

// set the flag to false to stop the message queue
document.getElementById('stopButton').addEventListener('click', _ => {
  running = false;
});

// register the start event
document.getElementById('startButton').addEventListener('click', _ => {
  running = true;
  // detach the task
  _ = DoSomethingPeriodically();
});


// placeholder function
function DoSomething(value){
  const newValue = value + 1;

  h1Element.textContent = newValue.toString();

  return newValue;
}

// non blocking javascript message queue
async function DoSomethingPeriodically() {
  let value = 0;

  // call the function the first time
  value = DoSomething(value);

  while (running) {
    // await the prpmise since it is using timeout in there the gui thread is not blocking
    value = await new Promise(
      // return the value once set timeout has finished
      resolve => setTimeout(
         // finish the promise by passing the return value of the function
        () => resolve(running ? DoSomething(value) : -1),
        5000
      )
    );
    if (value === -1){
      return;
    }
  }
}