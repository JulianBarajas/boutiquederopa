document.addEventListener("DOMContentLoaded", function () {
  const botonesCategorias = document.querySelectorAll(".categoria");
  const productos = document.querySelectorAll(".producto");
  const buscador = document.getElementById("buscador");
  const btnBuscar = document.getElementById("btnBuscar");

  // 🔹 Filtrado por categoría
  botonesCategorias.forEach((boton) => {
    boton.addEventListener("click", function () {
      const categoria = this.getAttribute("data-categoria");

      productos.forEach((producto) => {
        const categoriaProducto = producto.getAttribute("data-category");

        if (categoria === "todas" || categoriaProducto === categoria) {
          producto.style.display = "block"; // Mostrar producto
        } else {
          producto.style.display = "none"; // Ocultar producto
        }
      });

      // Resaltar la categoría seleccionada
      botonesCategorias.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // 🔹 Función para buscar productos
  function filtrarProductos() {
    const texto = buscador.value.toLowerCase().trim();

    productos.forEach((producto) => {
      const nombreProducto = producto
        .querySelector("h2")
        .textContent.toLowerCase();

      if (nombreProducto.includes(texto)) {
        producto.style.display = "block"; // Mostrar si coincide
      } else {
        producto.style.display = "none"; // Ocultar
      }
    });
  }

  // 🔹 Filtrar en tiempo real al escribir
  buscador.addEventListener("keyup", filtrarProductos);

  // 🔹 Filtrar al hacer clic en el botón de búsqueda
  btnBuscar.addEventListener("click", filtrarProductos);
});

document.addEventListener("DOMContentLoaded", function () {
  const productos = document.querySelectorAll(".producto");
  const productosPorPagina = 8;
  let paginaActual = 1;

  function mostrarProductos() {
    productos.forEach((producto, index) => {
      if (
        index >= (paginaActual - 1) * productosPorPagina &&
        index < paginaActual * productosPorPagina
      ) {
        producto.style.display = "block";
      } else {
        producto.style.display = "none";
      }
    });

    document.getElementById(
      "pageIndicator"
    ).textContent = `Página ${paginaActual}`;
  }

  document.getElementById("nextPage").addEventListener("click", function () {
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    if (paginaActual < totalPaginas) {
      paginaActual++;
      mostrarProductos();
    }
  });

  document.getElementById("prevPage").addEventListener("click", function () {
    if (paginaActual > 1) {
      paginaActual--;
      mostrarProductos();
    }
  });

  // Mostrar productos al cargar la página
  mostrarProductos();
});

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

document.querySelectorAll(".producto a").forEach((link) => {
  link.addEventListener("click", function (e) {
    // Obtenemos el contenedor del producto
    const productoDiv = this.closest(".producto");

    // Extraemos la información
    const nombre = productoDiv.querySelector("h2").textContent;
    const precio = productoDiv.querySelector("p").textContent;
    const imagenPrincipal = productoDiv.querySelector("img").src;
    const categoria = productoDiv.getAttribute("data-category");
    const imagesString = productoDiv.getAttribute("data-images") || "";
    // Convertimos la cadena en un array
    const vistasAdicionales = imagesString.split(",").map((img) => img.trim());

    const productoSeleccionado = {
      nombre,
      precio,
      imagenPrincipal,
      categoria,
      vistasAdicionales, // <-- arreglo de rutas de imágenes
    };

    localStorage.setItem(
      "productoSeleccionado",
      JSON.stringify(productoSeleccionado)
    );
    // Deja que siga el enlace a producto.html
  });
});

const btnTop = document.getElementById("btnTop");

// Mostrar/ocultar el botón según el scroll
window.addEventListener("scroll", () => {
  // Si se ha bajado 200px, mostramos el botón
  if (window.scrollY > 200) {
    btnTop.style.display = "flex";
  } else {
    btnTop.style.display = "none";
  }
});

// Al hacer clic, subir al tope
btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
