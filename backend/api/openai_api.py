import requests

def get_ai_response(data, input_text, API_KEY):
    url = "https://api.together.xyz/v1/chat/completions"
    headers = {"Authorization": f"Bearer {API_KEY}"}
    #optimized prompt to get the answer based on the provided information
    prompt = f"You must answer strictly based on the provided information. Do not use external knowledge, make assumptions, or infer anything beyond what is explicitly stated. Here is the information you must use: {data}, Now, answer the following question based only on the above information:{input_text} If the information does not contain an answer, respond with: The provided information does not contain an answer to this question."
    data = {
        "model": "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        "messages": [{"role": "user", "content": prompt}]
    }
    response = requests.post(url, json=data, headers=headers)
    return response.json()['choices'][0]['message']['content']