from gtts import gTTS

def text_to_audio(text):
    tts = gTTS(text=text, lang='en')
    return tts