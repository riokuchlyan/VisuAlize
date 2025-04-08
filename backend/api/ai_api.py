# internal

# external
from openai import OpenAI 
from dotenv import load_dotenv

# built-in
import os

load_dotenv()

def get_ai_response(data, input_text):
    client = OpenAI(
  api_key=os.getenv("TOGETHER_AI_KEY")
)
    completion = client.chat.completions.create(
    model="gpt-4o-mini",
    store=True,
    messages=[
        {"role": "user", "content": f"You must answer strictly based on the provided information and by looking up the given companies 10-k form. Do not use external knowledge, make assumptions, or infer anything beyond what is explicitly stated besides the companies 10-k form that you can look up. Here is the information you must use: {data}, Now, answer the following question based only on the above information and the companies 10-k form:{input_text}. You must provide the answers in an easy to read and digestable format with just text. Only use plain text so do not format your answer using characters such as the new line character. For example, in your response ensure it can be interpreted in plain text and not have characters such as slash n appear. Under no circumstances should your response be over 1000 characters."}
    ]
    )
    return (completion.choices[0].message.content)

def get_ai_response_technicals(data):
    client = OpenAI(
  api_key=os.getenv("TOGETHER_AI_KEY")
)
    completion = client.chat.completions.create(
    model="gpt-4o-mini",
    store=True,
    messages=[
        {"role": "user", "content": f"Give me technical data and key performance indicators such as P/E ratios and more for this stock: {data}, You must provide the answers in an easy to read and digestable format with just text. Only use plain text so do not format your answer using characters such as the new line character. For example, in your response ensure it can be interpreted in plain text and not have characters such as slash n appear. Under no circumstances should your response be over 500 characters."}
    ]
    )
    return (completion.choices[0].message.content)

def get_ai_response_valuation(data):
    client = OpenAI(
  api_key=os.getenv("TOGETHER_AI_KEY")
)
    completion = client.chat.completions.create(
    model="gpt-4o-mini",
    store=True,
    messages=[
        {"role": "user", "content": f"Make me the appropriate models for this stock: {data}, such as a DCF and more. You must provide the answers in an easy to read and digestable format with just text. Only use plain text so do not format your answer using characters such as the new line character. For example, in your response ensure it can be interpreted in plain text and not have characters such as slash n appear. Under no circumstances should your response be over 500 characters."}
    ]
    )
    return (completion.choices[0].message.content)