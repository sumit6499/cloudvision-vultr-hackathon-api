import { HfInference } from "@huggingface/inference"
import { exit } from "process"
import defaultCode from "./default/constant_code"

const client = new HfInference("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")

const imgUrl=Bun.env.IMG_URL 

if(!imgUrl){
	console.log('image url not found')
	exit(0)
}


const stream = client.chatCompletionStream(
{
	model: "meta-llama/Llama-3.2-11B-Vision-Instruct",
	messages: [
		{ 
			role: "user", 
			content: [
				{
					type:"image_url",
					"image_url":{"url":imgUrl}
				},
				{
					type:"text",
					text:"you are terraform expert and can create terraform code by undstanding image provided to you and put in entire code in terraform language (entire terraform code inside two delimiter &&). Create only terraform code  with property content for given image . Instruction: response should be between two symbol that can act as delimiter."
				} 
			]
					
		}
	],
		max_tokens: 1300,
	}
);

const getStream=async ()=>{
	try {
		let out = "";
		let newContent:string|undefined;
		for await (const chunk of stream) {
			if (chunk.choices && chunk.choices.length > 0) {
				newContent = chunk.choices[0].delta.content;
				out += newContent;
			}  
		}
		return out
	} catch (error) {
		console.log(error)
		return defaultCode
	}
	
}

const llmRes=await getStream()

export default llmRes