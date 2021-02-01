async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)
  
  // 🔥 start here: write code to loop through the rides

  let outputElement = document.querySelector('.rides')

  for(let i=0; i<json.length; i++) {
    rides = json[i]
    console.log(rides)
  
    if (rides.length > 1) {
      levelOfService = 'Noober Pool'
    } else if (rides[0].purpleRequested) {
      levelOfService = 'Noober Purple'
    } else if (rides[0].numberOfPassengers > 3) {
      levelOfService = 'Noober XL'
    } else {
      levelOfService = 'Noober X'
    } 

    outputElement.insertAdjacentHTML("beforeend", `
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        <i class="fas fa-car-side"></i>
        <span>${levelOfService}</span>
      </h1>`
      )

    for(let s=0; s<rides.length; s++) {
      passenger = rides[s]
      console.log(passenger)

      passengerName = `${passenger.passengerDetails.first} ${passenger.passengerDetails.last}`
      passengerPhoneNumber = passenger.passengerDetails.phoneNumber
      numberOfPassengers = passenger.numberOfPassengers
      PickupAddressLine1 = passenger.pickupLocation.address
      PickupAddressLine2 = `${passenger.pickupLocation.city}, ${passenger.pickupLocation.state} ${passenger.pickupLocation.zip}`
      DropoffAddressLine1 = passenger.dropoffLocation.address
      DropoffAddressLine2 = `${passenger.dropoffLocation.city}, ${passenger.dropoffLocation.state} ${passenger.dropoffLocation.zip}`


    outputElement.insertAdjacentHTML("beforeend",
      `<div class="border-4 border-gray-900 p-4 my-4 text-left">
      <div class="flex">
        <div class="w-1/2">
          <h2 class="text-2xl py-1">${passengerName}</h2>
          <p class="font-bold text-gray-600">${passengerPhoneNumber}</p>
        </div>
        <div class="w-1/2 text-right">
          <span class="rounded-xl bg-gray-600 text-white p-2">
            ${numberOfPassengers} passengers
          </span>
        </div>
      </div>
      <div class="mt-4 flex">
        <div class="w-1/2">
          <div class="text-sm font-bold text-gray-600">PICKUP</div>
          <p>${PickupAddressLine1}</p>
          <p>${PickupAddressLine2}</p>
        </div>
        <div class="w-1/2">
          <div class="text-sm font-bold text-gray-600">DROPOFF</div>
          <p>${DropoffAddressLine1}</p>
          <p>${DropoffAddressLine2}</p>
        </div>
      </div>
    </div>`
      )
    }

  }

}

window.addEventListener('DOMContentLoaded', pageLoaded)