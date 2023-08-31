const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Summarize this \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });

    if (completion.choices[0].text) {
      return res.status(200).json(completion.choices[0].text);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `write a detail paragraph about \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });

    if (completion.choices[0].text) {
      return res.status(200).json(completion.choices[0].text);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Answer question similar to how yoda from star war would.\nMe: 'what is your name?'\nyoda: 'yoda is my name'\nMe: ${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });

    if (completion.choices[0].text) {
      return res.status(200).json(completion.choices[0].text);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const completion = await openai.completions.create({
      model: "text-davinci-002",
      prompt: `/* convert these instruction into javascript code \n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });

    if (completion.choices[0].text) {
      return res.status(200).json(completion.choices[0].text);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const image = await openai.images.create({
      prompt: `generate a scifi image of ${text}`,
      n: 1,
      size: "512x512",
    });

    if (image.data[0].url) {
      return res.status(200).json(image.data[0].url);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
