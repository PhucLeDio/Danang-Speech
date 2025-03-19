import React, { useRef, useState } from "react";

import BTN from "../components/images/mic-speak.png";

import "../components/style/Volume.css";

import Label from "./Label";

const Speak = (props) => {
	const [recording, setRecording] = useState(false);
	const [isRecordingEffect, setIsRecordingEffect] = useState(false); // Hiệu ứng ghi âm
	const mediaRecorderRef = useRef(null);
	const audioChunksRef = useRef([]);
	const [checkSpeaking, setCheckSpeaking] = useState("Kiểm tra pháta âm");

	// get text
	const { name } = props;

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true
			});
			const mimeType = MediaRecorder.isTypeSupported("audio/wav")
				? "audio/wav"
				: "audio/webm";

			const mediaRecorder = new MediaRecorder(stream, { mimeType });
			mediaRecorderRef.current = mediaRecorder;
			audioChunksRef.current = [];

			mediaRecorder.ondataavailable = (event) => {
				audioChunksRef.current.push(event.data);
			};

			mediaRecorder.onstop = async () => {
				const blob = new Blob(audioChunksRef.current, {
					type: mimeType
				});
				const audioData = await processAudioBlob(blob);
				sendAudioData(audioData); // Gửi dữ liệu JSON
			};

			mediaRecorder.start();
			setRecording(true);
			setIsRecordingEffect(true); // Bật hiệu ứng ghi âm
		} catch (error) {
			console.error("Error accessing microphone:", error);
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setRecording(false);
			setIsRecordingEffect(false);
		}
	};

	const processAudioBlob = async (audioBlob) => {
		const arrayBuffer = await audioBlob.arrayBuffer();
		const audioContext = new (window.AudioContext ||
			window.webkitAudioContext)();

		try {
			const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

			const channelData = audioBuffer.getChannelData(0); // Float32Array [-1.0, 1.0]
			console.log("Waveform length:", channelData.length);
			console.log("Last 10 samples:", channelData.slice(-100));

			return Array.from(channelData);
		} catch (error) {
			console.error("Error decoding audio data:", error);
		}
	};

	const sendAudioData = async (audioData) => {
		if (!name) {
			alert("Please enter the word you want to pronounce!");
			return;
		}

		if (audioData && audioData.length > 0) {
			const data = {
				waveform: [audioData],
				sample_rate: 44100,
				canonical: name
			};

			try {
				const response = await fetch(
					"http://74.249.194.187:8000/vmd/infer",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(data)
					}
				);

				console.log(response);

				if (response.ok) {
					const result = await response.json();
					let count = 0;
					let tmp = "";
					console.log(result.response);
					result.response.map(([char, status]) => {
						if (status === 1) {
							tmp += `<span style="color: red;">${char}</span>`;
						} else {
							tmp += `<span style="color: blue;">${char}</span>`;
						}
						count++;
						if (count === 2) {
							tmp += " ";
						}
					});

					setCheckSpeaking(tmp.trim());
				} else {
					alert("Error from server!");
				}
			} catch (error) {
				console.error("Error sending audio data:", error);
				alert("Failed to send audio data!");
			}
		} else {
			alert("Please record first!");
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			}}>
			<div
				style={{
					display: "flex",
					alignItems: "center"
				}}>
			
				<button
					onClick={recording ? stopRecording : startRecording}
					style={{
						cursor: "pointer",
						border: "none",
						backgroundColor: isRecordingEffect
							? "#FF4136"
							: "#ffcd78",
						animation: isRecordingEffect
							? "blink 1s infinite"
							: "none",
						paddingTop: "5px",
						paddingBottom: "5px",
						marginRight: "5px",
						borderRadius: "50%",
						display: "flex"
					}}>
					<img
						src={BTN}
						style={{ color: "#AAAAAA" }}
						width={32}
						height={32}
						borderRadius="50%"
						alt="Button speak"
					/>
				</button>

				<Label
					text={checkSpeaking}
					alignContent={"center"}
					height={"36px"}
					width={"190px"}
					textAlign={"center"}
					border={"none"}
					backgroundColor={"#FFDB5A"}
					color={"#A83D00"}
					boxShadow={"none"}
					fontSize={"20px"}
				/>
			</div>
		</div>
	);
};

export default Speak;
