import React, { useState, useRef, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Paper, Box } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: theme.spacing(2),
		padding: theme.spacing(2, 1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	box: {
		display: "flex",
	},
	inputFile: { lineHeight: "52px" },
}))

export default function App() {
	const classes = useStyles()
	const canvasRef = useRef(null)
	const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
	const setMouseCoordinates = (event) => {
		setMousePos({ x: event.clientX, y: event.clientY })
	}
	const drawFace = (ctx) => {
		const canvasHeight = ctx.canvas.height
		const canvasWidth = ctx.canvas.width
		const radius = 100
		ctx.beginPath()
		//Circle
		ctx.arc(canvasWidth / 2, canvasHeight / 2, radius, 0, 2 * Math.PI)
		ctx.stroke()
		//Eyes
		ctx.beginPath()
		ctx.arc(
			canvasWidth / 2 - radius / 2,
			canvasHeight / 2 - radius / 4,
			radius / 6,
			0,
			2 * Math.PI,
		)
		ctx.stroke()
		ctx.beginPath()
		ctx.arc(
			canvasWidth / 2 + radius / 2,
			canvasHeight / 2 - radius / 4,
			radius / 6,
			0,
			2 * Math.PI,
		)
		ctx.stroke()
		//Mouth
		// ctx.beginPath()
		// ctx.ellipse(
		// 	canvasWidth / 2,
		// 	canvasHeight / 2 + radius / 4,
		// 	30,
		// 	30,
		// 	Math.PI,
		// 	0,
		// 	Math.PI,
		// 	true,
		// )
		// ctx.stroke()
	}
	useEffect(() => {
		let ctx = canvasRef.current.getContext("2d")
		const canvasHeight = ctx.canvas.height
		const canvasWidth = ctx.canvas.width
		const radius = 100
		let [w, h] = [canvasRef.current.width, canvasRef.current.height]
		ctx.clearRect(0, 0, w, h)

		drawFace(ctx)
		//Eyeballs
		ctx.beginPath()
		ctx.arc(
			canvasWidth / 2 -
				radius / 1.5 +
				(mousePos.x - canvasWidth / 2) / 30,
			canvasHeight / 2 -
				radius / 4 +
				(mousePos.y - canvasHeight / 2) / 30,
			radius / 12,
			0,
			2 * Math.PI,
		)
		ctx.fill()
		ctx.beginPath()
		ctx.arc(
			canvasWidth / 2 + radius / 3 + (mousePos.x - canvasWidth / 2) / 30,
			canvasHeight / 2 -
				radius / 4 +
				(mousePos.y - canvasHeight / 2) / 30,
			radius / 12,
			0,
			2 * Math.PI,
		)
		ctx.fill()
		//Tongue
		ctx.beginPath()
		ctx.ellipse(
			canvasWidth / 2,
			canvasHeight / 2 + radius / 4,
			30,
			70,
			Math.PI,
			0,
			Math.PI,
			true,
		)
		ctx.fill()
		ctx.save()
		ctx.restore()
	})
	return (
		<div className={classes.root}>
			<Container maxWidth='sm'>
				<Paper elevation={2} className={classes.paper}>
					<Box>
						<canvas
							ref={canvasRef}
							width={500}
							height={500}
							onMouseMove={setMouseCoordinates}
						/>
					</Box>
				</Paper>
			</Container>
		</div>
	)
}
