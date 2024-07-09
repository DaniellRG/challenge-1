document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const encryptBtn = document.getElementById('encrypt-btn');
    const outputText = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const clearBtn = document.getElementById('clear-btn');

    const desplazamiento = 3; // Desplazamiento para la encriptación/desencriptación

    const llaves = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    function desencriptarTexto(textoEncriptado) {
        // Definir las llaves de encriptación
        const llavesEncriptacion = {
            'enter': 'e',
            'imes': 'i',
            'aif': 'a',
            'ober': 'o',
            'ufat': 'u'
        };

        // Reemplazar cada llave por su valor correspondiente
        Object.keys(llavesEncriptacion).forEach(llave => {
            const regex = new RegExp(llave, 'g');
            textoEncriptado = textoEncriptado.replace(regex, llavesEncriptacion[llave]);
        });

        return textoEncriptado;
    }

    // Añadir event listener al botón de desencriptar
    decryptBtn.addEventListener('click', () => {
        const textoEncriptado = inputText.value.trim(); // Obtener el texto encriptado
        const textoDesencriptado = desencriptarTexto(textoEncriptado); // Desencriptar el texto
        outputText.value = textoDesencriptado; // Mostrar el texto desencriptado en el textarea de salida
    });

    function encriptarTexto(texto) {
        return texto.replace(/[a-z]/g, char => {
            return llaves[char] || char;
        });
    }

    function desencriptarTexto(textoEncriptado) {
        return textoEncriptado.replace(/(enter|imes|ai|ober|ufat)/g, match => {
            return Object.keys(llaves).find(key => llaves[key] === match) || match;
        });
    }

    // Función para limpiar el contenido del textarea
    function limpiarTexto() {
        inputText.value = '';
        outputText.value = '';
    }

    // Añadir event listener al botón de limpiar
    clearBtn.addEventListener('click', () => {
        limpiarTexto();
    });

    encryptBtn.addEventListener('click', () => {
        const texto = inputText.value.toLowerCase().replace(/[^a-z]/g, '');
        const textoEncriptado = encriptarTexto(texto);
        outputText.value = textoEncriptado;
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.value).then(() => {
            alert('Texto copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar texto: ', err);
        });
    });

    decryptBtn.addEventListener('click', () => {
        const textoEncriptado = outputText.value;
        const textoDesencriptado = desencriptarTexto(textoEncriptado);
        outputText.value = textoDesencriptado;
    });
});
