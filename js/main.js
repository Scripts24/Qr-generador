const wrapper = document.querySelector(".wrapper")
const qrInput = wrapper.querySelector(".form input")
const generateBtn = wrapper.querySelector(".form button")
const qrImg = wrapper.querySelector(".qr-code img")
const descarga = document.querySelector("#descarga")
const img = document.querySelector("img");
let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generando Código QR";
    });
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
});

descarga.addEventListener("click", () => {
    let imgPath = img.getAttribute("src");
    let nombreArchivo = getFileName(imgPath);

    // Utilizar fetch para obtener la imagen como Blob
    fetch(imgPath)
        .then(response => response.blob())
        .then(blob => {
            // Crear un enlace temporal y simular un clic para descargar
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = nombreArchivo;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
});

function getFileName(str) {
    return str.substr(str.lastIndexOf("/") + 1);
}
