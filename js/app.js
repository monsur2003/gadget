let keyword = 'watch'

const loadPhone = async (search,limit) => {
  // keyword = search
  // document.getElementById("input-field").value = "";
  document.getElementById("phone-container").innerHTML = "";

  const URL = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(URL);
  const data = await res.json();
  displayPhone(data.data,limit);
};
const displayPhone = (phones,limit) => {
  const showAll = document.getElementById("show-all");
  if (limit && phones.length > 12) {
    phones = phones.slice(0, 12);

    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }

  const alertDisplay = document.getElementById("d-alert");
  if (phones.length === 0) {
    alertDisplay.classList.remove("hidden");
    spinner(false)
  } else {
    alertDisplay.classList.add("hidden");
  }
  // console.log(phone_name)
  const phoneContainer = document.getElementById("phone-container");
  phones.forEach((phone) => {
    // console.log(phone);
    const { brand, phone_name, image } = phone;
    // console.log(phone_name)
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="card card-compact w-full bg-base-100 shadow-2xl">
        <figure class="p-4"><img src="${image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title text-[22px] text-black ">${phone_name}</h2>
          <p class="text-[18px] text-gray-800 font-semibold" >${brand}</p>
          <p class="text-gray-500" > dolor sit amet consectetur amet consectetur adipisicing elit. Beatae, nulla.</p>
          <div class="card-actions justify-start">
            <a href="#my-modal-2" onmouseover="showDetails('${phone.slug}')" class="underline cursor-pointer text-[18px] text-fuchsia-500 hover:text-blue-400 mb-2" for="my-modal">See details</a>
          </div>
        </div>
      </div>
    
    
    `;

    phoneContainer.appendChild(div);

    spinner(false);
  });
};
const showProduct = (limit)=>{
  spinner(true);
  const inputValue = document.getElementById("input-field").value;
  loadPhone(inputValue,limit);
}
document.getElementById("search-btn").addEventListener("click", function () {
  showProduct(10)
});

document
  .getElementById("input-field")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      showProduct(10)
    }
    // spinner(true);
  });

const loader = document.getElementById("loader2");
const spinner = (isLoading) => {
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

document.getElementById('view-all').addEventListener('click',function(){
  showProduct()
})

const showDetails = (id)=>{
  const URL = `https://openapi.programming-hero.com/api/phone/${id}`
  fetch(URL)
  .then(res=>res.json())
  .then(data=>phoneDetails(data.data))
}

const phoneDetails = data =>{
  // console.log(data.mainFeatures)
  const {mainFeatures}= data
  const {storage,displaySize,chipSet}= mainFeatures
  console.log(storage,displaySize,chipSet)
  const {name,brand,image} = data
    const phoneTitle = document.getElementById('title')
    phoneTitle.innerText = name
    const detailsBody = document.getElementById('body')
    detailsBody.innerHTML = `
    <div>
      <p class= "text-[18px] text-blue-800 font-semibold border-b-4 mb-2">${brand}</p>
      <img class="w-[170px] h-[190px]" src="${image}" alt="">
    </div>
    <div class=" border-t-4 text-gray-600 mt-2">
      <p> Storage: ${storage}</p>
      <p>Display: ${displaySize}</p>
      <p>Chipset: ${chipSet}</p>
    </div>
    
    `  
}






loadPhone(keyword,10);
