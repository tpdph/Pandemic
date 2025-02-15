# app/services/video_script_generator.py
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from openai import OpenAI

class ScriptGenerator:
    def __init__(self):
        self.template = """Create viral video script about {topic} with:
        - Hook in first 3 seconds
        - Problem/Solution structure
        - CTA for {affiliate_product}
        Max length: 300 characters"""
        
        self.prompt = PromptTemplate(
            template=self.template,
            input_variables=["topic", "affiliate_product"]
        )
        
    def generate(self, topic: str, product: str) -> str:
        chain = LLMChain(llm=OpenAI(temperature=0.7), prompt=self.prompt)
        return chain.run(topic=topic, affiliate_product=product)