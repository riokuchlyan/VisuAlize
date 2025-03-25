from openai import OpenAI # type: ignore
import os
from dotenv import load_dotenv # type: ignore

load_dotenv()


def get_ai_response(data, input_text):
    client = OpenAI(
  api_key=os.getenv("TOGETHER_AI_KEY")
)
    completion = client.chat.completions.create(
    model="gpt-4o-mini",
    store=True,
    messages=[
        {"role": "user", "content": f"You must answer strictly based on the provided information and by looking up the given companies 10-k form. Do not use external knowledge, make assumptions, or infer anything beyond what is explicitly stated besides the companies 10-k form that you can look up. Here is the information you must use: {data}, Now, answer the following question based only on the above information and the companies 10-k form:{input_text}. You must provide the answers in an easy to read and digestable format with just text. Only use plain text so do not format your answer using characters such as the new line character. Under no circumstances should your response be over 1000 characters."}
    ]
    )
    return (completion.choices[0].message.content)