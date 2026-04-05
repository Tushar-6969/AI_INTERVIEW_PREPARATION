import os
import json
import requests
from dotenv import load_dotenv
from utils.web_search import WebSearchAgent
from database.db_manager import db

load_dotenv()

class AIAgent:
    """Main AI Agent using Groq REST API"""

    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        self.model = "llama-3.3-70b-versatile"
        self.web_agent = WebSearchAgent()
        self.conversation_history = []

        self.url = "https://api.groq.com/openai/v1/chat/completions"

        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        # Tool definitions
        self.tools = [
            {
                "type": "function",
                "function": {
                    "name": "search_web",
                    "description": "Search the web for current information.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "query": {"type": "string"},
                            "num_results": {"type": "integer", "default": 5}
                        },
                        "required": ["query"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "fetch_webpage",
                    "description": "Fetch webpage content",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "url": {"type": "string"}
                        },
                        "required": ["url"]
                    }
                }
            }
        ]

    # ----------------------------
    # Tool Execution
    # ----------------------------

    def execute_tool(self, tool_name, tool_args):
        if tool_name == "search_web":
            query = tool_args.get("query")
            num_results = tool_args.get("num_results", 5)
            result = self.web_agent.search_web(query, num_results)
            return self.web_agent.summarize_search_results(result)

        elif tool_name == "fetch_webpage":
            url = tool_args.get("url")
            result = self.web_agent.fetch_webpage(url)
            if result.get("success"):
                return result["content"]
            return f"Error: {result.get('error')}"

        return "Tool not found"

    # ----------------------------
    # Chat Function
    # ----------------------------

    def chat(self, user_message, conversation_id=None, user_id=None):

        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })

        max_iterations = 5
        iteration = 0

        while iteration < max_iterations:
            iteration += 1

            payload = {
                "model": self.model,
                "messages": self.conversation_history,
                "tools": self.tools,
                "tool_choice": "auto",
                "temperature": 0.7,
                "max_tokens": 2000
            }

            try:
                response = requests.post(
                    self.url,
                    headers=self.headers,
                    json=payload
                )
                response.raise_for_status()
                result = response.json()

            except requests.exceptions.RequestException as e:
                return {
                    "response": f"API Error: {str(e)}",
                    "iterations": iteration
                }

            assistant_message = result["choices"][0]["message"]

            # ----------------------------
            # TOOL CALL DETECTED
            # ----------------------------

            if "tool_calls" in assistant_message:

                self.conversation_history.append(assistant_message)

                for tool_call in assistant_message["tool_calls"]:
                    function_name = tool_call["function"]["name"]
                    function_args = json.loads(
                        tool_call["function"]["arguments"]
                    )

                    tool_result = self.execute_tool(
                        function_name,
                        function_args
                    )

                    self.conversation_history.append({
                        "role": "tool",
                        "tool_call_id": tool_call["id"],
                        "content": tool_result
                    })

                continue

            # ----------------------------
            # FINAL RESPONSE
            # ----------------------------

            final_response = assistant_message.get("content", "")

            self.conversation_history.append({
                "role": "assistant",
                "content": final_response
            })

            return {
                "response": final_response,
                "iterations": iteration
            }

        return {
            "response": "Max iterations reached.",
            "iterations": iteration
        }

    def reset_conversation(self):
        self.conversation_history = []