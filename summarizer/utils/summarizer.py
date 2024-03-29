import os
import warnings
from colorama import Fore, Style, init
from cli import file_picker, get_instruction_input, model_picker
from llm import summarize_with_llm
from ebooklib import epub

def epub_to_text(epub_path):
    """Converts EPUB file to text."""
    book = epub.read_epub(epub_path)
    text = ''
    for item in book.get_items_of_type(ebooklib.ITEM_DOCUMENT):
        text += item.get_content().decode('utf-8', 'ignore') + ' '
    return text

def tokenize_into_chunks(text, chunk_size=175000):
    """Tokenizes text into chunks."""
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

def process_epub_file(selected_file, model, instructions):
    """Processes EPUB file."""
    text = epub_to_text('books/'+selected_file)
    chunks = tokenize_into_chunks(text)
    mini_summaries = ""
    for i, chunk in enumerate(chunks):
        summary = summarize_with_llm(model, chunk, instructions)
        mini_summaries += summary
        print(f'{Fore.CYAN}Summary of section {i + 1} of {len(chunks)}:\n\n{summary}\n')
        if i + 2 <= len(chunks):
            print(Fore.YELLOW + f'Processing section {i + 2} of {len(chunks)}, please wait (each section takes about 80 seconds)...')
    return mini_summaries

def generate_overall_summary(model, mini_summaries):
    """Generates overall summary."""
    overall_instructions = "please combine these mini summaries into one short, succinct and coherent summary. Write no more than two paragraphs (do NOT use bullet points). Write the summary in clear prose, using the Economist's style guide with American spelling. If available, put the title, author, language, and country of publication at the top of your summary. This summary will be published in a magazine. See text below:"
    return summarize_with_llm(model, mini_summaries, overall_instructions)

def main():
    warnings.filterwarnings("ignore", category=UserWarning, module="ebooklib.epub")
    init(autoreset=True)
    print(Fore.BLUE + "Choose an EPUB file:")
    selected_file = file_picker()
    print(Fore.GREEN + f"Selected file: {selected_file}\n")
    print(Fore.BLUE + "Choose an LLM:")
    model = model_picker()
    print(Fore.BLUE + "Choose an instruction option:")
    instructions = get_instruction_input()
    if instructions == "Enter your own instruction":
        instructions = input(Fore.BLUE + "Enter your custom summarization instructions (or enter for default): ") or "Summarize the following text"
    print(Fore.GREEN + f"Selected instruction: {instructions}\n")
    print(Fore.YELLOW + "Processing file, please wait... (this normally takes about 80 seconds)")
    mini_summaries = process_epub_file(selected_file, model, instructions)
    print(Fore.GREEN + 'Done processing mini_summaries... working on putting it all together')
    overall_summary = generate_overall_summary(model, mini_summaries)
    print(f'{Fore.CYAN} Overall Summary:\n\n {overall_summary}\n')
    print(Fore.GREEN + 'Done! Text has been tokenized and summaries were generated.')

if __name__ == "__main__":
    main()