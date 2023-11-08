/**
 * ! Not a head pat we need, but a head pat we deserved!
 */

/* Resources list */
const patSenko = [
	"/img/senko_0.jpg",
	"/img/senko_1.jpg",
	"/img/senko_2.jpg",
	"/img/senko_3.jpg",
]

/* Config */
const senko = document.getElementById("senko-san")
let patEnd = patSenko.length - 2
let patting = false
let playingMusic = false
let backgroundMusic = document.getElementById("background-music")

backgroundMusic.volume = 0.5

/* Helper Function */
const act = (observer, callback, events) =>
	events.map((event) =>
		observer.addEventListener(event, () => callback(), true)
	)

const is = (move, patEnd = 0) => (move > patEnd ? true : false)
const not = (move, patEnd = 0) => (move === patEnd ? true : false)

const patAnd = (move) =>
	(senko.style.backgroundImage = `url(${patSenko[move]})`)

const toRight = (move) => --move
const toLeft = (move) => ++move

const patHandler = () => {
	patting = true

	document.body.style.cursor = "grabbing"

	return pat()
}

const stopPat = () => {
	patting = false

	return (senko.style.backgroundImage = `url("/img/senko_normal.jpg")`)
}

/* Act Function */
const calm = () => {
	document.body.style.cursor = "pointer"
	stopPat()
}

const pat = (stillRight = 0, goRight) =>
	setTimeout(
		() => {
			let hand = stillRight,
				move = hand,
				patLeft = 0

			if (!playingMusic) backgroundMusic.play()

			if (!patting) return stopPat()

			if (goRight)
				pat(
					is(stillRight) ? toRight(hand) : patEnd,
					not(stillRight, patLeft)
				)
			else
				pat(
					is(stillRight, patEnd) ? patLeft : toLeft(hand),
					not(stillRight, patEnd)
				)

			return patAnd(move)
		},
		210,
		stillRight,
		goRight,
		patting
	)

/* Add event */
document.addEventListener("DOMContentLoaded", async () => {
	act(senko, calm, ["mouseup", "touchend"])
	act(senko, patHandler, ["mousedown", "touchstart"])
})
