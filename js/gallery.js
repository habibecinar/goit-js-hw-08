const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];
// 1️⃣ Galeri içeriğini dinamik olarak oluşturma
const galleryEl = document.querySelector(".gallery");

const galleryMarkup = images
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery-item">
        <a class="gallery-link" href="${original}">
          <img class="gallery-image" src="${preview}" data-source="${original}" alt="${description}" />
        </a>
      </li>`
  )
  .join("");

// **Galerinin stilini ayarlayalım**

galleryEl.style.display = "flex";
galleryEl.style.flexWrap = "wrap";
galleryEl.style.width = "100%";
galleryEl.style.display = "696px";
galleryEl.style.top = "204px";
galleryEl.style.gap = "3px";
galleryEl.style.padding = "20px";
galleryEl.style.listStyle = "none";
galleryEl.style.margin = "10px";

galleryEl.innerHTML = galleryMarkup;

// **Her resmin bulunduğu LI etiketine genişlik ekleyelim**
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.style.width = "360px"; // Üçlü dizilim için
  item.style.height = "200px";
  item.style.justifyContent = "center";
  item.style.margin = "10px";
  item.style.padding = "10px";
});

// **Resimlere stil**
document.querySelectorAll(".gallery-image").forEach((img) => {
  img.style.width = "100%";
  img.style.height = "200px";
  img.style.objectFit = "cover";
  img.style.transition = "transform 0.3s ease-in-out";

  img.addEventListener("mouseenter", () => {
    img.style.transform = "scale(1.1)";
  });

  img.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});

// 2️⃣ Delegasyon yöntemiyle tıklamaları dinleme
galleryEl.addEventListener("click", (event) => {
  event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller

  const targetImage = event.target;
  if (!targetImage.classList.contains("gallery-image")) {
    return;
  }

  const largeImageUrl = targetImage.dataset.source;

  // 3️⃣ Modal pencereyi açma
  const instance = basicLightbox.create(`
      <img src="${largeImageUrl}" width="800" height="600">
    `);

  instance.show();

  // **4️⃣ Escape tuşu ile kapatma işlemi**
  const closeOnEscape = (event) => {
    if (event.key === "Escape") {
      instance.close();
      document.removeEventListener("keydown", closeOnEscape);

      // **Kapatınca eski boyutları geri yükleyelim**
      document.querySelectorAll(".gallery-image").forEach((img) => {
        img.style.transform = "scale(1)";
      });
    }
  };

  document.addEventListener("keydown", closeOnEscape);
});
