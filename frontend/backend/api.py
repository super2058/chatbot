import openai

# Set your OpenAI API key
api_key = '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'
openai.api_key = api_key
def get_response(prompt):

    response = openai.Completion.create(
        engine="text-davinci-003",  # Choose an appropriate engine
        prompt=prompt,
        max_tokens=100  # Limit the response length
    )
    print(response.choices[0].text)
    return response.choices[0].text
