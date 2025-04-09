# internal

# external
from gtts import gTTS

# built-in
import io
import base64

def text_to_audio(text):
    tts = gTTS(text=text, lang='en')
    temp_data = io.BytesIO()
    temp_data.seek(0)
    encoded_data = base64.b64encode(temp_data.read()).decode("utf-8")
    return encoded_data