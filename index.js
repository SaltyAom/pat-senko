/**
 * ! Not a head pat we need, but a head pat we deserved!
 */

/* Resources list */
const patSenko = [
    require("/img/senko_0.jpg"),
    require("/img/senko_1.jpg"),
    require("/img/senko_2.jpg"),
    require("/img/senko_3.jpg")
]

/* Config */
const senko = document.getElementById("senko-san")
    patEnd = patSenko.length - 2,
    patting = false

/* Helper Function */
const act = (observer, callback, events) =>
	events.map(event =>
		observer.addEventListener(event, () => callback(), true)
    )

const is = (move, patEnd = 0) => move > patEnd ? true : false
const not = (move, patEnd = 0) => move === patEnd ? true : false

const patAnd = (move) => senko.src = patSenko[move]

const toRight = (move) => --move
const toLeft = (move) => ++move

const patHandler = () => {
	patting = true
	return pat()
}

const stopPat = () => {
	patting = false
	return senko.src = require("/img/senko_normal.jpg")
}

/* Act Function */
const calm = () => stopPat()

const pat = (stillRight = 0, goRight) =>
	setTimeout(() => {
        let hand = stillRight,
            move = hand,
            patLeft = 0

        if (!patting)
            return stopPat()

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
    }, 210, stillRight, goRight, patting
	)

/* Add event */
document.addEventListener("DOMContentLoaded", () => {
	let preload = require("pre-image")
	patSenko.map(senkoPat => preload(senkoPat))

	act(senko, calm, ["mouseup", "touchend"])
	act(senko, patHandler, ["mousedown", "touchstart"])
})