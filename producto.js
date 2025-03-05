// Funcion del menú hamburguesa

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#menu");
const cerrar = document.querySelector("#cerrar");
const enlaces = document.querySelectorAll(".nav-links li a");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});

enlaces.forEach((enlace) => {
  enlace.addEventListener("click", () => {
    nav.classList.remove("visible");
  });
});

const allProducts = [
  {
    nombre: "Blusa Corset",
    precio: "$25.00",
    imagenPrincipal: "img/BlusaCorset.jpg",
    categoria: "blusas",
    vistasAdicionales: [
      "img/BlusaCorset.jpg",
      "img/BlusaCorset_view2.jpg",
      "img/BlusaCorset_view3.jpg",
    ],
  },
  {
    nombre: "Camisietas",
    precio: "$50.00",
    imagenPrincipal: "img/Camisetas.jpg",
    categoria: "camisetas",
    vistasAdicionales: [
      "img/Camisetas.jpg",
      "img/Camisetas_view2.jpg",
      "img/Camisetas_view3.jpg",
    ],
  },
  {
    nombre: "Conjunto Fresh",
    precio: "$40.000",
    imagenPrincipal: "img/ConjuntoFresh.jpg",
    categoria: "conjuntos",
    vistasAdicionales: ["img/ConjuntoFresh.jpg", "img/ConjuntoFresh_view2.jpg"],
  },
  {
    nombre: "Conjunto anaranjado",
    precio: "$25.000",
    imagenPrincipal: "img/Conjunto elegante.jpg",
    categoria: "conjuntos",
    vistasAdicionales: [
      "img/Conjunto elegante.jpg",
      "img/ConjuntoElegante_view2.jpg",
    ],
  },
  {
    nombre: "Enterizo",
    precio: "$50.00",
    imagenPrincipal: "img/Enterizo.jpg",
    categoria: "enterizos",
    vistasAdicionales: [
      "img/Enterizo.jpg",
      "img/Enterizo_view2",
      "img/Enterizo_view3",
    ],
  },
  {
    nombre: "Vestido Corto",
    precio: "$30.00",
    imagenPrincipal: "img/Vestido corto.jpg",
    categoria: "vestidos",
    vistasAdicionales: ["img/Vestido corto.jpg", "img/Vestido corto_view2.jpg"],
  },
  {
    nombre: "Conjunto Morado",
    precio: "$50.000",
    imagenPrincipal: "img/ConjuntoIdeal.jpg",
    categoria: "conjuntos",
    vistasAdicionales: [
      "img/ConjuntoIdeal.jpg",
      "img/ConjuntoIdeal_view2.jpg",
      "img/ConjuntoIdeal_view3.jpg",
    ],
  },
  {
    nombre: "Conjunto verde",
    precio: "$50.00",
    imagenPrincipal: "img/Conjuntoverde.jpg",
    categoria: "conjuntos",
    vistasAdicionales: ["img/Conjuntoverde.jpg", "img/Conjuntoverde_view2.jpg"],
  },
  {
    nombre: "Enterizo Rosado",
    precio: "$150.000",
    imagenPrincipal: "img/EnterizoRosado.jpg",
    categoria: "enterizos",
    vistasAdicionales: [
      "img/EnterizoRosado.jpg",
      "img/EnterizoRosado_view2.jpg",
    ],
  },
  {
    nombre: "Look Urbano",
    precio: "$50.00",
    imagenPrincipal: "img/LookUrbano.jpg",
    categoria: "looks",
    vistasAdicionales: ["img/LookUrbano.jpg", "img/LookUrbano_view2.jpg"],
  },
];

// Función para mezclar aleatoriamente (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 2. Mostrar el producto seleccionado
const productoJSON = localStorage.getItem("productoSeleccionado");
if (productoJSON) {
  // Usamos "productoSeleccionado" en lugar de "producto"
  const productoSeleccionado = JSON.parse(productoJSON);
  document.getElementById("productName").textContent =
    productoSeleccionado.nombre;
  document.getElementById("productPrice").textContent =
    productoSeleccionado.precio;
  document.getElementById("productCategory").textContent =
    "Categoría: " + productoSeleccionado.categoria;
  document.getElementById("mainImage").src =
    productoSeleccionado.imagenPrincipal;

  // Crear la galería de vistas adicionales
  const gallery = document.getElementById("gallery");
  productoSeleccionado.vistasAdicionales.forEach((imgUrl) => {
    const thumb = document.createElement("img");
    thumb.src = imgUrl;
    thumb.classList.add("thumbnail");
    thumb.alt = productoSeleccionado.nombre;
    thumb.addEventListener("click", () => {
      document.getElementById("mainImage").src = imgUrl;
    });
    gallery.appendChild(thumb);
  });

  // 3. Generar productos de referencia
  // Filtrar para excluir el producto actualmente seleccionado
  let productosReferencia = allProducts.filter(
    (prod) => prod.nombre !== productoSeleccionado.nombre
  );
  // Mezclar aleatoriamente
  productosReferencia = shuffle(productosReferencia);
  // Tomar hasta 5 productos
  const productosAMostrar = productosReferencia.slice(0, 5);
  const referenciaContenedor = document.getElementById("referenciaContenedor");

  productosAMostrar.forEach((prod) => {
    const refDiv = document.createElement("div");
    refDiv.classList.add("producto-ref");
    refDiv.setAttribute("data-nombre", prod.nombre);
    refDiv.setAttribute("data-precio", prod.precio);
    refDiv.setAttribute("data-imagenprincipal", prod.imagenPrincipal);
    refDiv.setAttribute("data-category", prod.categoria);
    refDiv.setAttribute("data-images", prod.vistasAdicionales.join(","));

    refDiv.innerHTML = `
        <img src="${prod.imagenPrincipal}" alt="${prod.nombre}">
        <h4>${prod.nombre}</h4>
        <p>${prod.precio}</p>
      `;

    refDiv.addEventListener("click", () => {
      localStorage.setItem("productoSeleccionado", JSON.stringify(prod));
      window.location.href = "producto.html";
    });

    referenciaContenedor.appendChild(refDiv);
  });
} else {
  document.getElementById("producto").innerHTML =
    "<p>No se encontró el producto seleccionado.</p>";
}

// 4. Botón Solicitar Pedido
document.getElementById("solicitarPedido").addEventListener("click", () => {
  const selectedSize = document.querySelector(
    'input[name="size"]:checked'
  ).value;

  const productName = document.getElementById("productName").textContent;
  const productPrice = document.getElementById("productPrice").textContent;
  const message = `Hola, estoy interesado en el producto: ${productName}, precio: ${productPrice}, talla: ${selectedSize}. ¿Podrían enviarme más información?`;

  const urlWhatsApp = `https://api.whatsapp.com/send?phone=+573187934623&text=${encodeURIComponent(
    message
  )}`;
  window.open(urlWhatsApp, "_blank");
});
