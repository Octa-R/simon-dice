Array.prototype.clear = function () {
	this.splice(0, this.length);
};
const secuenciaMaquina = [];
const secuenciaJugador = [];
const CUADROS = [];
window.onload = function () {
	const $start = document.querySelector(".start");
	for (let i = 0; i < 4; i++) {
		CUADROS.push(document.querySelector(`.cuadro-${i}`));
	}
	CUADROS.forEach(($cuadro) => {
		$cuadro.addEventListener("click", (e) => {
			jugar(e.target);
		});
	});
	$start.addEventListener("click", () => {
		$start.style.opacity = 1;
		$start.style.boxShadow = "0 0 5px red";
		manejarJugada();
	});
};
function resaltarCuadro($cuadro) {
	$cuadro.style.opacity = 1;
	setTimeout(() => {
		$cuadro.style.opacity = 0.5;
	}, 500);
}
function getNuevoCuadro() {
	return CUADROS[Math.floor(Math.random() * CUADROS.length)];
}
function playSecuencia() {
	return new Promise((resolve) => {
		let tiempoEnMS = (secuenciaMaquina.length + 1) * 1000; //lo que tarda en tocar la secuencia + 1 segundo
		secuenciaMaquina.forEach(($cuadro, index) => {
			setTimeout(() => {
				resaltarCuadro($cuadro);
			}, (index + 1) * 1000);
		});
		setTimeout(() => {
			resolve(true);
		}, tiempoEnMS);
	});
}
async function manejarJugada() {
	deshabilitarCuadros();
	let $nuevoCuadro = getNuevoCuadro();
	secuenciaMaquina.push($nuevoCuadro);
	await playSecuencia();
	habilitarCuadros();
	//esperando que el jugador presione los botones
}

function checarJugada($cuadro) {
	let pos = secuenciaJugador.length;
	if (secuenciaMaquina[pos] == $cuadro) {
		//si son iguales
		secuenciaJugador.push($cuadro);
		if (secuenciaJugador.length === secuenciaMaquina.length) {
			secuenciaJugador.clear();
			setTimeout(() => {
				manejarJugada();
			}, 1000);
		}
	} else {
		perder();
	}
}
function deshabilitarCuadros() {
	CUADROS.forEach((c) => {
		c.style.pointerEvents = "none";
	});
}
function habilitarCuadros() {
	CUADROS.forEach((c) => {
		c.style.pointerEvents = "auto";
	});
}
function jugar($cuadro) {
	resaltarCuadro($cuadro);
	checarJugada($cuadro);
}

function perder() {
	secuenciaMaquina.clear();
	document.querySelector(".start").style.opacity = 0.5;
	document.querySelector(".start").style.boxShadow = "0 0 0 red";
	for (let i = 0; i < 3; i++) {
		setTimeout(() => {
			CUADROS.forEach((c) => {
				resaltarCuadro(c);
			});
		}, 600 * i);
	}
	console.log("Game Over");
}
