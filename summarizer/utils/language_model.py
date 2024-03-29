import anthropic
import gemini
import openai

def summarize_with_anthropic_api(text_chunk: str, instructions: str) -> str:
    """
    Summarizes text using the Anthropics API.

    Args:
        text_chunk (str): Text to be summarized.
        instructions (str): Instructions for the summarization.

    Returns:
        str: Summarized text.
    """
    anthropic_client = anthropic.Anthropic()
    message = anthropic_client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=4000,
        temperature=0,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"{instructions} {text_chunk}"
                    }
                ]
            }
        ]
    )
    return message.content[0].text

def summarize_with_gemini_api(text_chunk: str, instructions: str) -> str:
    """
    Summarizes text using the Gemini API.

    Args:
        text_chunk (str): Text to be summarized.
        instructions (str): Instructions for the summarization.

    Returns:
        str: Summarized text.
    """
    gemini_client = gemini.Gemini()
    message = gemini_client.messages.create(
        model="gemini-turbo-20240229",
        max_tokens=4000,
        temperature=0,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"{instructions} {text_chunk}"
                    }
                ]
            }
        ]
    )
    return message.content[0].text

def summarize_with_openai_api(text_chunk: str, instructions: str) -> str:
    """
    Summarizes text using the OpenAI API.

    Args:
        text_chunk (str): Text to be summarized.
        instructions (str): Instructions for the summarization.

    Returns:
        str: Summarized text.
    """
    openai_client = openai.OpenAI()
    chat_completion = openai_client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[
            {
                "role": "user",
                "content": f"{instructions} {text_chunk}"
            }
        ]
    )
    return chat_completion.choices[0].message.content


def summarize_with_llm(llm_name: str, text_chunk: str, instructions: str) -> str:
    if llm_name == 'Claude 3':
        return summarize_with_anthropic_api(text_chunk, instructions),
    elif llm_name == 'Gemini':
        return summarize_with_gemini_api(text_chunk, instructions)
    elif llm_name == 'GPT-4':
        return summarize_with_openai_api(text_chunk, instructions)
    else:
        return f"model '{llm_name}' not found"