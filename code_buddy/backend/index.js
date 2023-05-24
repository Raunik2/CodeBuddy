const { Configuration, OpenAIApi } = require("openai");
const dotenv=require("dotenv");
const express=require('express');
const cors = require("cors");
const bodyParser=require('body-parser')

const app=express();
app.use(bodyParser.json());

app.use(cors())

app.post('/gpt',async(req,res)=>{
    let prompt=req.body.prompt;
    let response =await promptAI(prompt);
    res.send(response);
})

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let promptAI= async (prompt)=> {
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt,
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
console.log(response.data.choices[0].text);
return response.data.choices[0].text;
};




app.listen(4000,()=>{
  console.log("Ai is working");
})
