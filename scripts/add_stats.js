// should make child div of each li have a width = to base_stat's number
export function addStats(statsArray, element) {
  console.log(statsArray);
  console.log(statsArray[0].base_stat);
  console.log(element);
  console.log(element[0].firstElementChild);
  for (let i = 0; i < statsArray.length; i++) {
    element[i].firstElementChild.style.width = `${
      statsArray[i].base_stat * 2
    }px`;
    element[i].firstElementChild.innerHTML = statsArray[i].base_stat;
  }
}
