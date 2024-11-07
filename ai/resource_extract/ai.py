from g4f.client import Client

client = Client()

chat_completion = client.chat.completions.create(model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": [
                {
                    "type":"text",
                    "text": "Analyze this infrastructure diagram for Vultr cloud deployment. Focus on identifying these components: instances (servers), block storage volumes, private networks, and load balancers. Describe their relationships and configurations in a structured format."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://cloudvision-diagram.blr1.vultrobjects.com/sumit/AWS-Network-Diagram%20%281%29.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ZLIFDU8L767BDVY3UR3P%2F20241107%2Fblr1%2Fs3%2Faws4_request&X-Amz-Date=20241107T064756Z&X-Amz-Expires=604800&X-Amz-Signature=b90adcacaf9b2f95f3e4b931f40f9f9536613f56022314dc149674196afb3d12&X-Amz-SignedHeaders=host&x-id=GetObject" 
                    }
                }
            ]
        }
    ], stream=True)

for completion in chat_completion:
    print(completion.choices[0].delta.content or "", end="", flush=True)
