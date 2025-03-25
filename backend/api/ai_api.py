from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()


def get_ai_response(data, input_text):
    client = OpenAI(
  api_key=os.getenv("TOGETHER_AI_KEY")
)
    completion = client.chat.completions.create(
    model="gpt-4o-mini",
    store=True,
    messages=[
        {"role": "user", "content": f"You must answer strictly based on the provided information. Do not use external knowledge, make assumptions, or infer anything beyond what is explicitly stated. Here is the information you must use: {data}, Now, answer the following question based only on the above information:{input_text} If the information does not contain an answer, respond with: The provided information does not contain an answer to this question."}
    ]
    )
    return (completion.choices[0].message.content)