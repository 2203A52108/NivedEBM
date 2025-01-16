import streamlit as st
from gtts import gTTS
import os

def main():
    st.title("Text to Speech Converter")
    st.write("Enter your text below, select a language, and click the button to convert it into speech.")

    # Input Text Area
    text_input = st.text_area("Enter text to convert to speech", placeholder="Type your text here...")

    # Language Selection
    languages = {'English': 'en', 'Spanish': 'es', 'French': 'fr', 'German': 'de', 'Hindi': 'hi'}
    language = st.selectbox("Select Language", options=list(languages.keys()))

    # Convert to Speech Button
    if st.button("Convert to Speech"):
        if text_input.strip():
            tts = gTTS(text=text_input, lang=languages[language])
            audio_file = "output.mp3"
            tts.save(audio_file)
            st.audio(audio_file, format="audio/mp3", start_time=0)
        else:
            st.error("Please enter some text to convert.")

    # Clear Button
    if st.button("Clear Text"):
        st.experimental_rerun()

if __name__ == "__main__":
    main()
